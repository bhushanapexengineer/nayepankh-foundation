import { Request, Response } from 'express';
import { AppError, asyncHandler, sendSuccess, sendPaginated } from '../utils/errors';
import { getDB, updateDB, uuidv4 } from '../lib/store';

export const createDonation = asyncHandler(async (req: Request, res: Response) => {
  const donation = {
    id: uuidv4(), ...req.body,
    currency: 'INR', status: 'COMPLETED',
    transactionId: `TXN-${Date.now()}`,
    userId: req.user?.userId,
    createdAt: new Date().toISOString(),
  };
  updateDB((d) => {
    d.donations.push(donation);
    if (req.body.campaignId) {
      const c = d.campaigns.find((x) => x.id === req.body.campaignId);
      if (c) c.raised += req.body.amount;
    }
  });
  sendSuccess(res, donation, 'Thank you for your donation!', 201);
});

export const getDonations = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const db = getDB();
  const list = [...db.donations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  sendPaginated(res, list.slice((page - 1) * limit, page * limit), list.length, page, limit);
});

export const getDonation = asyncHandler(async (req: Request, res: Response) => {
  const donation = getDB().donations.find((d) => d.id === req.params.id);
  if (!donation) throw new AppError('Donation not found', 404);
  sendSuccess(res, donation);
});

export const updateDonation = asyncHandler(async (req: Request, res: Response) => {
  updateDB((d) => { const x = d.donations.find((i) => i.id === req.params.id); if (x) Object.assign(x, req.body); });
  sendSuccess(res, getDB().donations.find((d) => d.id === req.params.id));
});

export const deleteDonation = asyncHandler(async (req: Request, res: Response) => {
  updateDB((d) => { d.donations = d.donations.filter((x) => x.id !== req.params.id); });
  sendSuccess(res, null, 'Donation deleted');
});

export const getCampaigns = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, getDB().campaigns.filter((c) => c.isActive));
});

export const createCampaign = asyncHandler(async (req: Request, res: Response) => {
  const campaign = { id: uuidv4(), raised: 0, isActive: true, ...req.body };
  updateDB((d) => { d.campaigns.push(campaign); });
  sendSuccess(res, campaign, 'Campaign created', 201);
});

export const getDonationStats = asyncHandler(async (_req: Request, res: Response) => {
  const db = getDB();
  const completed = db.donations.filter((d) => d.status === 'COMPLETED');
  sendSuccess(res, {
    totalAmount: completed.reduce((s, d) => s + d.amount, 0),
    totalDonations: completed.length,
  });
});
