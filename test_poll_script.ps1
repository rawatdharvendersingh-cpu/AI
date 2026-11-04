$prompt = "breathtaking 3D Disney Pixar animated cinema film still, Lord Hanuman in majestic golden jewelry with mace standing faithfully beside radiant divine Prince Lord Shri Ram, cinematic hero shot, vibrant enchanted nature landscape, volumetric god rays, detailed Pixar 3D CGI character models, expressive facial animation, Unreal Engine 5 octane render, raytraced cinematic lighting, warm golden tones, masterpiece, 8k resolution"
$url = "https://image.pollinations.ai/prompt/" + [System.Uri]::EscapeDataString($prompt) + "?width=1024&height=576&nologo=true&seed=12345"

try {
    $sw = [System.Diagnostics.Stopwatch]::StartNew()
    $r = Invoke-WebRequest -Uri $url -Method Get -TimeoutSec 20
    $sw.Stop()
    Write-Output "Pollinations status: $($r.StatusCode) len: $($r.RawContentLength) time: $($sw.ElapsedMilliseconds)ms"
} catch {
    Write-Output "Pollinations error: $($_.Exception.Message)"
}

