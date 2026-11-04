$text = [System.Uri]::EscapeDataString("नमस्ते प्रभु श्री राम")
$url = "https://translate.google.com/translate_tts?ie=UTF-8&q=$text&tl=hi&total=1&idx=0&textlen=21&client=tw-ob"

try {
    $wc = New-Object System.Net.WebClient
    $wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
    $wc.Headers.Add("Referer", "http://translate.google.com/")
    $wc.DownloadFile($url, "$PSScriptRoot\test_g_tts.mp3")
    $len = (Get-Item "$PSScriptRoot\test_g_tts.mp3").Length
    Write-Output "Google TTS Success! Downloaded: $len bytes"
} catch {
    Write-Output "Google TTS Error: $($_.Exception.Message)"
}

