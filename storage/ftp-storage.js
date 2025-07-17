import { Storage } from 'directus';
import ftp from 'basic-ftp';
import path from 'path';

export default class FTPStorage extends Storage {
  constructor(config) {
    super(config);
    this.config = config;
  }

  async upload(file, stream) {
    const client = new ftp.Client();
    try {
      await client.access({
        host: this.config.host,
        port: this.config.port || 21,
        user: this.config.user,
        password: this.config.password,
        secure: false,         // Cambiar a true si usas FTPS (Azure lo soporta)
        passive: true
      });

      const remotePath = path.posix.join(this.config.basePath || '/', file.filename_disk);
      await client.uploadFrom(stream, remotePath);
    } finally {
      client.close();
    }

    return file.filename_disk;
  }

  async delete(filename) {
    const client = new ftp.Client();
    try {
      await client.access({
        host: this.config.host,
        port: this.config.port || 21,
        user: this.config.user,
        password: this.config.password,
        secure: false,
        passive: true
      });

      const remotePath = path.posix.join(this.config.basePath || '/', filename);
      await client.remove(remotePath);
    } finally {
      client.close();
    }
  }

  getUrl(file) {
    return `${this.config.publicUrl}/${file.filename_disk}`;
  }
}