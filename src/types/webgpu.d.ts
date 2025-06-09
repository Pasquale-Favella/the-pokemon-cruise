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

type GPUDeviceDescriptor = any
type GPUDevice = any