Add-Type -AssemblyName System.Drawing

$bg = [System.Drawing.Bitmap]::FromFile("c:\Users\admin\Desktop\AI\assets\images\clean_scene_1.jpg")
$ele = [System.Drawing.Bitmap]::FromFile("c:\Users\admin\Desktop\AI\assets\images\elephant_sprite.png")
$mou = [System.Drawing.Bitmap]::FromFile("c:\Users\admin\Desktop\AI\assets\images\mouse_sprite.png")

$canvas = New-Object System.Drawing.Bitmap(1280, 720, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# 1. Background
$g.DrawImage($bg, 0, 0, 1280, 720)

# 2. Shadows
$shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(110, 15, 23, 42))
$g.FillEllipse($shadowBrush, 250, 560, 320, 65)
$g.FillEllipse($shadowBrush, 790, 565, 160, 42)
$shadowBrush.Dispose()

# 3. Elephant Sprite (Facing Right)
$g.DrawImage($ele, 200, 200, 420, 420)

# 4. Mouse Sprite (Facing Left)
$mou.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX)
$g.DrawImage($mou, 770, 395, 210, 210)

$g.Dispose()
$bg.Dispose()
$ele.Dispose()
$mou.Dispose()

$canvas.Save("c:\Users\admin\Desktop\AI\test_composite.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$canvas.Dispose()
Write-Host "Composite saved successfully!"
