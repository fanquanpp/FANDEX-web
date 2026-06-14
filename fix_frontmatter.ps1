$files = @(
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\A2A协议深入.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\Agent可观测性平台.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\Agent失败模式.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\Agent经济体与声誉.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\Agno与Mastra生产运行时.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\AI-Scientist-v2自主研究.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\AlphaEvolve进化编码.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\Anthropic工作流模式.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\AutoGen-Actor模型与Agent框架.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\CAIS-CAISI与社会规模风险.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\Claude-Agent-SDK.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\Claude-Code权限模式.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\CrewAI角色团队与流程.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\Darwin-Godel自修改Agent.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\FIPA-ACL遗产.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\HTN规划与进化搜索.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\LangGraph状态图与持久执行.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\MARL强化学习.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\METR时间范围与外部评估.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\OpenAI-Agents-SDK.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\OpenAI准备性与DeepMind前沿安全框架.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\OpenTelemetry-GenAI语义约定.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\Reflexion语言强化学习.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\ReWOO与计划执行.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\STaR自教推理.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\为何多Agent.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\交接与例程.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\先提议后提交模式.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\共享记忆与黑板.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\共识与拜占庭容错.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\协商与讨价还价.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\基准测试SWE-bench与GAIA.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\基准测试WebArena与OSWorld.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\多Agent辩论与协作.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\失败模式MAST与群体思维.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\宪法AI与价值观对齐.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\工具使用与函数调用.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\并行群体网络.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\心智理论与涌现协调.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\心智社会与辩论.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\思维树与LATS.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\成本治理器与预算终止.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\技能库与终身学习.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\投票辩论拓扑.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\有界自改进设计.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\案例研究与SOTA.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\检查点与回滚.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\浏览器Agent与间接注入.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\混合记忆向量图与KV.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\生产扩展队列与检查点.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\生成式Agent与涌现模拟.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\终止开关与金丝雀令牌.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\群体优化PSO与ACO.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\群聊与发言者选择.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\自主编码Agent格局.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\自动化对齐研究AAR.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\自精炼与CRITIC.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\角色专业化.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\计算机使用Agent.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\记忆块与睡眠时间计算.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\记忆虚拟上下文与MemGPT.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\评估与协调基准.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\语音Agent-Pipecat与LiveKit.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\递归自改进与对齐竞赛.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\通信协议.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\长时间范围Agent.md',
    'c:\Atian\Project\Trae\FANDEX-vue\src\content\docs\agent\长时间运行Agent持久执行.md'
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw -Encoding UTF8

    # Extract the blockquote after the heading as description basis
    $descMatch = [regex]::Match($content, '> (.+?)(?:\n\n|\r\n\r\n)')
    $desc = ""
    if ($descMatch.Success) {
        $desc = $descMatch.Groups[1].Value
        # Clean up the description - remove markdown links, trim length
        $desc = $desc -replace '\[([^\]]+)\]\([^\)]+\)', '$1'
        $desc = $desc -replace '\*\*([^*]+)\*\*', '$1'
        $desc = $desc -replace '`([^`]+)`', '$1'
        # Trim to ~120 chars if too long
        if ($desc.Length -gt 150) {
            $desc = $desc.Substring(0, 147) + '...'
        }
    }

    # Replace slug line with module line
    $content = $content -replace '(?m)^slug:.*\r?\n', "module: agent`n"

    # Add description after title line if not already present
    if ($content -notmatch '(?m)^description:') {
        # Find the title line and add description after it
        $content = $content -replace '(?m)^(title:.*)$', "`$1`ndescription: `"$desc`""
    }

    Set-Content $file -Value $content -Encoding UTF8 -NoNewline
    Write-Output "Fixed: $file"
}
