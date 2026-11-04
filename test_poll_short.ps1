try {
    $r = Invoke-WebRequest -Uri "https://image.pollinations.ai/prompt/shri%20ram%20and%20hanuman%20in%20forest?width=512&height=512&nologo=true" -Method Get -TimeoutSec 15
    Write-Output "Short prompt success: $($r.StatusCode) len: $($r.RawContentLength)"
} catch {
    Write-Output "Short prompt error: $($_.Exception.Message)"
}

