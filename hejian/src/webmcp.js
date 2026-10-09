export function registerPageTools(context, { filterMenu, openReservation }) {
  if (!context?.registerTool) return () => {}
  const lifecycle = new AbortController()
  const tools = [
    {
      name: 'filter_seasonal_menu',
      description: '筛选页面中的时令菜品，all 为全部、main 为主菜、light 为轻食。',
      inputSchema: { type: 'object', properties: { category: { type: 'string', enum: ['all', 'main', 'light'] } }, required: ['category'], additionalProperties: false },
      execute: input => filterMenu(input.category),
    },
    {
      name: 'open_reservation_draft',
      description: '打开预约草稿表单，不发送或确认预约。',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      execute: () => openReservation(),
    },
  ]
  const registered = new Set()
  for (const tool of tools) {
    try {
      Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal }))
        .then(() => {
          if (lifecycle.signal.aborted) {
            try { context.unregisterTool?.(tool.name) } catch {}
          } else registered.add(tool.name)
        })
        .catch(() => {})
    } catch {}
  }
  function cleanup() {
    if (lifecycle.signal.aborted) return
    lifecycle.abort()
    for (const name of registered) {
      try { context.unregisterTool?.(name) } catch {}
    }
    registered.clear()
    window.removeEventListener('pagehide', cleanup)
  }
  window.addEventListener('pagehide', cleanup, { once: true })
  return cleanup
}
