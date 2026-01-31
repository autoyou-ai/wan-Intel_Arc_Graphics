# Wan2GP (Pinokio Launcher)

Pinokio launcher for Wan2GP, a local Gradio UI for AI video generation and related media workflows.

## How to use
1. Click **Install** in Pinokio and wait for dependencies to finish.
2. Click **Start** to launch the Web UI.
3. Intel users (CPU fallback): use **Advanced → CPU (Intel / IPEX)** to run without CUDA.

## API (programmatic access)
Wan2GP is a Gradio app. Use the **API** tab inside the Web UI to copy the exact endpoint names for your version, then plug them into the examples below.

### JavaScript
```js
import { client } from "@gradio/client";

const app = await client("http://127.0.0.1:PORT");
const result = await app.predict("/YOUR_ENDPOINT", [/* params from API tab */]);
console.log(result);
```

### Python
```python
from gradio_client import Client

app = Client("http://127.0.0.1:PORT")
result = app.predict(*[/* params from API tab */], api_name="/YOUR_ENDPOINT")
print(result)
```

### Curl
```bash
curl -X POST "http://127.0.0.1:PORT/gradio_api/run/predict" \
  -H "Content-Type: application/json" \
  -d '{"data":[/* params from API tab */],"fn_index":0}'
```

