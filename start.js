module.exports = async (kernel) => {
  let port = await kernel.port()
  return {
    requires: {
      bundle: "ai",
    },
    daemon: true,
    run: [
      {
        method: "shell.run",
        params: {
          venv: "env",
          env: {
            SERVER_NAME: "127.0.0.1",
            SERVER_PORT: port,
            WAN_USE_IPEX: "{{args.ipex ? '1' : ''}}",
            ACCELERATE_USE_IPEX: "{{args.ipex ? 'true' : ''}}",
            MPLCONFIGDIR: "{{path.resolve('app/cache/matplotlib')}}"
          },
          path: "app",
          message: [
            "python wgp.py --multiple-images {{args.device ? '--gpu ' + args.device : ''}} {{args.compile ? '--compile' : ''}}"
          ],
          on: [{
            "event": "/(http:\\/\\/[0-9.:]+)/",
            "done": true
          }]
        }
      },
      {
        method: "local.set",
        params: {
          url: "{{input.event[1]}}"
        }
      }
    ]
  }
}
