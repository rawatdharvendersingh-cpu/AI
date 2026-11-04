try {
    $r = Invoke-WebRequest -Uri "https://image.pollinations.ai/prompt/cute%20cat?model=flux&nologo=true" -Method Get -TimeoutSec 15
    Write-Output "Flux: $($r.StatusCode)"
} catch {
    Write-Output "Flux error: $($_.Exception.Message)"
}

try {
    $r = Invoke-WebRequest -Uri "https://image.pollinations.ai/prompt/cute%20cat?model=turbo&nologo=true" -Method Get -TimeoutSec 15
    Write-Output "Turbo: $($r.StatusCode)"
} catch {
    Write-Output "Turbo error: $($_.Exception.Message)"
}

