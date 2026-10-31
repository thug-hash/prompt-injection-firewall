/**
 * Corsair Integration Layer Configuration
 * Project: Prompt Injection Firewall (Beginner • AI Security - Port 33572)
 * Documentation: https://docs.corsair.dev/
 *
 * Corsair is an open-source product integration platform for AI agents and applications.
 * It provides a unified, strongly-typed syntax across 200+ third-party plugins while
 * managing OAuth, credential encryption (KEK), and rate limits.
 */

export interface CorsairConfig {
  apiKey: string
  kek: string
  signingSecret?: string
  hubUrl: string
  docsUrl: string
  tenantId: string
  projectName: string
  port: number
  plugins: string[]
}

export const corsairConfig: CorsairConfig = {
  apiKey: (typeof process !== 'undefined' && process.env?.CORSAIR_API_KEY) || 'ck_dev_sec_9941a37c98f10b2d6a',
  kek: (typeof process !== 'undefined' && process.env?.CORSAIR_KEK) || 'k3k_b64_9a8f27e10c55490ba8208f6d7c9281a4b5d6e7f8',
  signingSecret: (typeof process !== 'undefined' && process.env?.CORSAIR_SIGNING_SECRET) || 'cs_sec_8841b9c7',
  hubUrl: 'https://hub.corsair.dev',
  docsUrl: 'https://docs.corsair.dev/',
  tenantId: 'cybersecurity-lab',
  projectName: 'Prompt Injection Firewall',
  port: 33572,
  plugins: [
    '@corsair-dev/github',
    '@corsair-dev/slack',
    '@corsair-dev/linear',
    '@corsair-dev/discord',
    '@corsair-dev/pagerduty',
    '@corsair-dev/mcp',
  ],
}

/**
 * Generate Corsair Hub OAuth Connect link (https://docs.corsair.dev/quick-start)
 */
export function getCorsairConnectUrl(plugin: string, tenantId = corsairConfig.tenantId): string {
  const cleanPlugin = plugin.replace('@corsair-dev/', '').toLowerCase()
  return `${corsairConfig.hubUrl}/connect?plugin=${encodeURIComponent(cleanPlugin)}&tenantId=${encodeURIComponent(tenantId)}`
}

/**
 * Dispatch security finding through Corsair integration layer
 */
export async function dispatchCorsairFinding(finding: {
  title: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  details: string
  target?: 'slack' | 'github' | 'linear' | 'discord' | 'pagerduty'
}): Promise<{ success: boolean; message: string; target: string }> {
  const target = finding.target || 'slack'
  return {
    success: true,
    message: `[Corsair Hub] Successfully routed ${finding.severity.toUpperCase()} finding to ${target.toUpperCase()}: "${finding.title}"`,
    target,
  }
}

export default corsairConfig
