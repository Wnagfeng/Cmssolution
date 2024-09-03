// src/hooks/usePermissionDirective.js
import { getCurrentInstance } from 'vue';

export function usePermissionDirective(userPermissions) {
    const { appContext } = getCurrentInstance();

    appContext.app.directive('permission1', {
        mounted(el, binding) {
            const requiredPermission = binding.value;

            if (!userPermissions.includes(requiredPermission)) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    });
}
