export interface PrismaLifecycleHarness {
  initialize: () => Promise<void>;
  destroy: () => Promise<void>;
  setConnect: (implementation: () => Promise<void>) => void;
  setDisconnect: (implementation: () => Promise<void>) => void;
  setLogger: (logger: {
    log: (message: string) => void;
    error: (...args: unknown[]) => void;
  }) => void;
}

export function assertPrismaLifecycle(options: {
  createHarness: () => PrismaLifecycleHarness;
  connectMessage: string;
  connectErrorMessage: string;
  disconnectMessage: string;
  disconnectErrorMessage: string;
}): Promise<void>;
