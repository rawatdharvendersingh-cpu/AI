try {
    $wc = New-Object System.Net.WebClient
    $res = $wc.DownloadString("https://corsproxy.io/?url=" + [System.Uri]::EscapeDataString("https://translate.google.com/translate_tts?ie=UTF-8&q=hello&tl=en&client=tw-ob"))
    Write-Output "corsproxy length: $($res.Length)"
} catch {
    Write-Output "corsproxy error: $($_.Exception.Message)"
}

