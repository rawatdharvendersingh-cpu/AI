$src = "C:\Users\admin\.gemini\antigravity-ide\brain\5d932bde-a514-4e78-9f74-77aa43e62b96\monkey_storybook_character_1793101814248.jpg"
$dstJpg = "c:\Users\admin\Desktop\AI\assets\images\monkey_sprite.jpg"
$dstPng = "c:\Users\admin\Desktop\AI\assets\images\monkey_sprite.png"

Copy-Item $src $dstJpg -Force
. "c:\Users\admin\Desktop\AI\make_transparent.ps1"
[ImageProcessor]::RemoveWhiteBackground($dstJpg, $dstPng)
Write-Host "Monkey transparent PNG created successfully!"
Get-Item $dstPng | Select-Object Name, Length
