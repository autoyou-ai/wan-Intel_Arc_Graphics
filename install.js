module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      when: "{{gpu !== 'nvidia'}}",
      method: "notify",
      params: {
        html: "Non-NVIDIA GPU detected. This will attempt DirectML on Windows, otherwise fall back to CPU (slow)."
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/deepbeepmeep/Wan2GP app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r requirements.txt",
          "uv pip install hf-xet"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          xformers: true
        }
      }
    },
    {
      when: "{{platform === 'win32' && gpu !== 'nvidia'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "python -c \"import subprocess; subprocess.run(['uv','pip','install','intel-extension-for-pytorch'], check=False)\""
        ]
      }
    },
    {
      method: 'input',
      params: {
        title: 'Installation completed',
        description: 'Click "Start" to get started'
      }
    }
  ]
}
