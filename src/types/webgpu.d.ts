interface Navigator {
  gpu: GPU;
}

interface GPU {
  requestAdapter(options?: GPURequestAdapterOptions): Promise<GPUAdapter | null>;
}

interface GPURequestAdapterOptions {
  powerPreference?: "low-power" | "high-performance";
  forceFallbackAdapter?: boolean;
}

interface GPUAdapter {
  requestDevice(options?: GPUDeviceDescriptor): Promise<GPUDevice>;
  name: string;
}

interface GPUDeviceDescriptor {
  // Define properties as needed, e.g., requiredFeatures, requiredLimits
}

interface GPUDevice {
  // Define properties and methods as needed
}
