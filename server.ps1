param([int]$port = 8080, [string]$folder = "C:\Users\admin\Desktop\AI")
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server running on http://localhost:$port/"
$mime = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".mp3"  = "audio/mpeg"
    ".mp4"  = "video/mp4"
    ".webm" = "video/webm"
    ".svg"  = "image/svg+xml"
    ".srt"  = "text/plain; charset=utf-8"
    ".json" = "application/json"
}
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        $res.Headers.Add("Access-Control-Allow-Origin", "*")
        $res.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $res.Headers.Add("Access-Control-Allow-Headers", "*")

        if ($req.HttpMethod -eq "OPTIONS") {
            $res.StatusCode = 200
            $res.Close()
            continue
        }

        # TTS API Endpoint
        if ($req.Url.AbsolutePath -eq "/api/tts") {
            $text = $req.QueryString["text"]
            $lang = $req.QueryString["lang"]
            if ([string]::IsNullOrEmpty($lang)) { $lang = "hi" }
            if (![string]::IsNullOrEmpty($text)) {
                try {
                    $encoded = [System.Uri]::EscapeDataString($text)
                    $ttsUrl = "https://translate.google.com/translate_tts?ie=UTF-8&q=$encoded&tl=$lang&total=1&idx=0&client=tw-ob"
                    $wc = New-Object System.Net.WebClient
                    $wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
                    $wc.Headers.Add("Referer", "http://translate.google.com/")
                    $bytes = $wc.DownloadData($ttsUrl)
                    $res.ContentType = "audio/mpeg"
                    $res.ContentLength64 = $bytes.Length
                    $res.OutputStream.Write($bytes, 0, $bytes.Length)
                } catch {
                    $res.StatusCode = 500
                }
            } else {
                $res.StatusCode = 400
            }
            $res.Close()
            continue
        }

        $localPath = $req.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($localPath)) { $localPath = "index.html" }
        $localPath = [System.Uri]::UnescapeDataString($localPath)
        $filePath = Join-Path $folder $localPath
        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            if ($mime.ContainsKey($ext)) { $res.ContentType = $mime[$ext] }
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $res.StatusCode = 404
        }
        $res.Close()
    } catch {
        # ignore client disconnects
    }
}
