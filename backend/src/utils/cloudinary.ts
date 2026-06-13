// Cloudinary is not used in local/no-DB mode.
// File uploads are stored in memory only (not persisted to disk in this version).

export const uploadToCloudinary = async (
  _buffer: Buffer,
  _folder: string,
  _resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<{ url: string; publicId: string }> => {
  // Return a placeholder — in production configure CLOUDINARY_* env vars
  return { url: 'https://images.unsplash.com/photo-1559027615-cd4628903329?w=600', publicId: 'placeholder' };
};

export const deleteFromCloudinary = async (_publicId: string): Promise<void> => {
  // no-op in local mode
};
