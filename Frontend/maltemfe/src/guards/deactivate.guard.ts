export interface IHasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}
export const deactivateGuard = (component: IHasUnsavedChanges) => {
  if (!component.hasUnsavedChanges()) {
    return true;
  }
  if (confirm('There are unsaved changes. Are you sure to leave this page?')) {
    return true;
  }
  return false;
};
