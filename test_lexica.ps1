try {
    $res = Invoke-RestMethod -Uri "https://lexica.art/api/v1/search?q=hanuman%20ram%203d%20animation" -Method Get
    Write-Output "Lexica images count: $($res.images.Count)"
    if ($res.images.Count -gt 0) {
        Write-Output "First image URL: $($res.images[0].src)"
    }
} catch {
    Write-Output "Lexica error: $($_.Exception.Message)"
}

