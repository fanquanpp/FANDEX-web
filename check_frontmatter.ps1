$dirs = @(
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\ai-engineering',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\computer-vision',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\nlp',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\llm',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\generative-ai',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\multimodal',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\ai-ethics',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\machine-learning',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\deep-learning'
)

foreach ($dir in $dirs) {
    Get-ChildItem -Path $dir -Filter '*.md' -Recurse | ForEach-Object {
        $lines = Get-Content $_.FullName -TotalCount 30
        $content = $lines -join "`n"

        # Check if starts with ---
        if ($lines[0] -match '^---\s*$') {
            # Find closing ---
            $closeIdx = -1
            for ($i = 1; $i -lt $lines.Count; $i++) {
                if ($lines[$i] -match '^---\s*$') {
                    $closeIdx = $i
                    break
                }
            }

            if ($closeIdx -gt 0) {
                $fmLines = $lines[1..($closeIdx - 1)]
                $fmText = $fmLines -join "`n"

                $hasTitle = $fmText -match 'title\s*:'
                $hasModule = $fmText -match 'module\s*:'
                $hasDesc = $fmText -match 'description\s*:'
                $hasSlug = $fmText -match 'slug\s*:'

                $issues = @()
                if (-not $hasTitle) { $issues += 'missing title' }
                if (-not $hasModule) { $issues += 'missing module' }
                if (-not $hasDesc) { $issues += 'missing description' }
                if ($hasSlug) { $issues += 'has slug' }

                if ($issues.Count -gt 0) {
                    Write-Output ('{0} | {1}' -f $_.FullName, ($issues -join ', '))
                }
            } else {
                Write-Output ('{0} | no closing frontmatter' -f $_.FullName)
            }
        } else {
            Write-Output ('{0} | no frontmatter' -f $_.FullName)
        }
    }
}
