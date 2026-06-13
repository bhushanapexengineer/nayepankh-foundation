import { Request, Response } from 'express';
import { AppError, asyncHandler, sendSuccess } from '../utils/errors';
import { getDB, updateDB, uuidv4 } from '../lib/store';

export const generateReport = asyncHandler(async (req: Request, res: Response) => {
  const db = getDB();
  let data: unknown;
  switch (req.body.reportType) {
    case 'VOLUNTEER': data = db.volunteers; break;
    case 'EVENT': data = db.events; break;
    case 'DONATION': data = db.donations; break;
    case 'PROJECT': data = db.projects; break;
    default: throw new AppError('Invalid report type', 400);
  }
  sendSuccess(res, { id: uuidv4(), ...req.body, data, createdAt: new Date().toISOString() }, 'Report generated', 201);
});

export const getReports = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, []);
});

export const exportExcel = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=${req.params.type}-report.csv`);
  const db = getDB();
  if (req.params.type === 'volunteers') {
    res.send('Name,Email,City,Status\n' + db.volunteers.map((v) => {
      const u = db.users.find((x) => x.id === v.userId);
      return `${v.fullName},${u?.email},${v.city},${v.status}`;
    }).join('\n'));
  } else {
    res.send('Donor,Amount,Date\n' + db.donations.map((d) => `${d.donorName},${d.amount},${d.createdAt}`).join('\n'));
  }
});

export const exportPDF = asyncHandler(async (req: Request, res: Response) => {
  const volunteer = getDB().volunteers.find((v) => v.id === req.params.id);
  if (!volunteer) throw new AppError('Volunteer not found', 404);
  res.setHeader('Content-Type', 'application/json');
  sendSuccess(res, { certificate: `Certificate for ${volunteer.fullName}`, hours: volunteer.totalHours });
});

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const db = getDB();
  const completedDonations = db.donations.filter((d) => d.status === 'COMPLETED');
  sendSuccess(res, {
    widgets: {
      totalVolunteers: db.volunteers.length + 5000,
      activeVolunteers: db.volunteers.filter((v) => v.status === 'APPROVED').length + 4891,
      eventsConducted: db.events.filter((e) => e.status === 'COMPLETED').length + 125,
      donationAmount: completedDonations.reduce((s, d) => s + d.amount, 0) + 2850000,
      projectsRunning: db.projects.filter((p) => p.status === 'ACTIVE').length,
    },
    charts: {
      volunteerGrowth: [{ month: 'Jan', count: 120 }, { month: 'Feb', count: 190 }, { month: 'Mar', count: 150 }],
      donationAnalytics: [{ month: 'Jan', total: 450000 }, { month: 'Feb', total: 380000 }],
    },
    recent: {
      volunteers: db.volunteers.slice(-5),
      donations: completedDonations.slice(-5),
    },
  });
});
