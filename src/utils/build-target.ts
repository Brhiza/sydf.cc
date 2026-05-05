export interface CustomBuildOptions {
  buildTarget?: string | null;
  mode?: string | null;
  customFlag?: boolean;
}

export function isCustomBuild(options: CustomBuildOptions = {}): boolean {
  if (options.customFlag) {
    return true;
  }

  if (typeof options.buildTarget === 'string' && options.buildTarget.trim().toUpperCase() === 'CUSTOM') {
    return true;
  }

  return typeof options.mode === 'string' && options.mode.trim().toLowerCase() === 'oyyy';
}
