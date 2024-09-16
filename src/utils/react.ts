import React, { PropsWithRef } from "react";

/**
 * A static component is a component that do not re-render regardless of how props change
 * @param component React Function Component
 * @returns React Function Component
 */
export const createStaticComponent = <T>(
  component: React.FC<T>
): React.FC<PropsWithRef<T>> => React.memo(component, () => true);
