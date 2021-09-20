export function findWidowsIconByLabel(menuConfig: { label: string, windowsIcon?: string }[], label: string) {
    return menuConfig.find(config => config.label === label)?.windowsIcon
}