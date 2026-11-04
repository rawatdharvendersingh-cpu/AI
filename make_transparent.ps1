Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public class ImageProcessor {
    public static void RemoveWhiteBackground(string inputPath, string outputPath) {
        using (Bitmap src = new Bitmap(inputPath)) {
            int w = src.Width;
            int h = src.Height;
            using (Bitmap bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb)) {
                using (Graphics g = Graphics.FromImage(bmp)) {
                    g.DrawImage(src, 0, 0, w, h);
                }
                
                BitmapData data = bmp.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
                int stride = data.Stride;
                int totalBytes = Math.Abs(stride) * h;
                byte[] bytes = new byte[totalBytes];
                System.Runtime.InteropServices.Marshal.Copy(data.Scan0, bytes, 0, totalBytes);
                
                bool[] visited = new bool[w * h];
                Queue<int> queue = new Queue<int>();
                
                Func<int, int, bool> isBg = (x, y) => {
                    int idx = y * stride + x * 4;
                    byte b = bytes[idx];
                    byte gCol = bytes[idx + 1];
                    byte r = bytes[idx + 2];
                    return (r > 228 && gCol > 228 && b > 228);
                };
                
                for (int x = 0; x < w; x++) {
                    if (isBg(x, 0)) { visited[x] = true; queue.Enqueue(x); }
                    if (isBg(x, h - 1)) { visited[(h - 1) * w + x] = true; queue.Enqueue((h - 1) * w + x); }
                }
                for (int y = 0; y < h; y++) {
                    if (!visited[y * w] && isBg(0, y)) { visited[y * w] = true; queue.Enqueue(y * w); }
                    if (!visited[y * w + (w - 1)] && isBg(w - 1, y)) { visited[y * w + (w - 1)] = true; queue.Enqueue(y * w + (w - 1)); }
                }
                
                int[] dx = { 1, -1, 0, 0 };
                int[] dy = { 0, 0, 1, -1 };
                
                while (queue.Count > 0) {
                    int p = queue.Dequeue();
                    int px = p % w;
                    int py = p / w;
                    int idx = py * stride + px * 4;
                    
                    int b = bytes[idx];
                    int gCol = bytes[idx + 1];
                    int r = bytes[idx + 2];
                    int brightness = (r + gCol + b) / 3;
                    
                    if (brightness >= 244) {
                        bytes[idx + 3] = 0;
                    } else if (brightness > 218) {
                        int alpha = (int)((244 - brightness) / 26.0 * 255.0);
                        if (alpha < 0) alpha = 0;
                        if (alpha > 255) alpha = 255;
                        bytes[idx + 3] = (byte)alpha;
                    }
                    
                    for (int i = 0; i < 4; i++) {
                        int nx = px + dx[i];
                        int ny = py + dy[i];
                        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                            int nIdx = ny * w + nx;
                            if (!visited[nIdx]) {
                                if (isBg(nx, ny)) {
                                    visited[nIdx] = true;
                                    queue.Enqueue(nIdx);
                                }
                            }
                        }
                    }
                }
                
                System.Runtime.InteropServices.Marshal.Copy(bytes, 0, data.Scan0, totalBytes);
                bmp.UnlockBits(data);
                bmp.Save(outputPath, ImageFormat.Png);
            }
        }
    }
}
"@

Write-Host "Converting Elephant..."
[ImageProcessor]::RemoveWhiteBackground("c:\Users\admin\Desktop\AI\assets\images\elephant_sprite.jpg", "c:\Users\admin\Desktop\AI\assets\images\elephant_sprite.png")
Write-Host "Elephant converted successfully!"

Write-Host "Converting Mouse..."
[ImageProcessor]::RemoveWhiteBackground("c:\Users\admin\Desktop\AI\assets\images\mouse_sprite.jpg", "c:\Users\admin\Desktop\AI\assets\images\mouse_sprite.png")
Write-Host "Mouse converted successfully!"
