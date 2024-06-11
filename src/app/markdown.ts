const markdown = `## Hello world!

# [#](https://microslac.com/) This is the Microslac project
A clone version of [Slack](https://slack.com/) application with minimal functionalities, deployed on [Kubernetes](https://kubernetes.io/) using [Microservices](https://microservices.io/patterns/microservices.html) architecture.

[Repositories](https://github.com/orgs/microslac/repositories)

[Demo](https://microslac.com/signup)

---
## Microservices

### [Auth](https://github.com/microslac/auth)
- Native login/signup authentication using [JWT](https://jwt.io/)
- API requests authentication to downstream services through [Kong Gateway](https://docs.konghq.com/kubernetes-ingress-controller/latest/)
- [OAuth 2.0](https://oauth.net/2/) authenticate, with providers such as Google, Github, LinkedIn

### [Realtime](https://github.com/microslac/realtime)
- The backend HTTP service communicating with [AWS Gateway WebSocket API](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-overview.html)
- Receiving $connect, $default and $disconnect events from the [Web UI](https://github.com/microslac/web), then write to key-value store [Redis](https://redis.io/) for other realtime workloads.
- Consuming internal events, via [RabbitMQ](https://www.rabbitmq.com/) work queues, produced by other services and broadcast to interested client apps (identify by [connection id](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-route-keys-connect-disconnect.html#apigateway-websocket-api-routes-about-connect)).
- Leveraging [Redis keyspace notifications](https://redis.io/docs/latest/develop/use/keyspace-notifications/) to implement [realtime presence mechanism](https://systemdesign.one/real-time-presence-platform-system-design/), in order to broadcast a particular user's status (online/offline) to other interested participants
- Fully asynchronous implementation with [FastAPI](https://fastapi.tiangolo.com/), [FastStream](https://faststream.airt.ai/latest/faststream/), [Redis Asyncio](https://redis-py.readthedocs.io/en/stable/examples/asyncio_examples.html) and [SQLAlchemy Asyncio](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html)


### [Conversations](https://github.com/microslac/conversations)
- Managing channels, members and messages generated from Web UI
- Publishing various events (message.sent, member.joined, member.leave,...) to RabbitMQ
- Developed using [TDD](https://en.wikipedia.org/wiki/Test-driven_development) method with testing libraries: [Pytest](https://docs.pytest.org/en/8.2.x/), [Factory Boy](https://factoryboy.readthedocs.io/en/stable/)


### [Chat](https://github.com/microslac/chat)
- FastAPI implementation as an intermediate layer before the inference with LLM models:
- Serving model via [HuggingFace TGI](https://huggingface.co/docs/text-generation-inference/en/index) with the following models: [Llama-3](https://huggingface.co/meta-llama/Meta-Llama-3-8B), [Mistral-7B](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2), [Phi-2](https://huggingface.co/microsoft/phi-2)
- Serving messages via [LangServe](https://python.langchain.com/v0.2/docs/langserve/) and chat history with [LangChain Memory](https://python.langchain.com/v0.1/docs/modules/memory/)

### [Client](https://github.com/microslac/client)
- A read-only service for querying replicated data from [PostgreSQL](https://www.postgresql.org/) slave-database with [SQLAlchemy](https://www.sqlalchemy.org/)
- Data replication is implemented using [Kafka Connect](https://docs.confluent.io/platform/current/connect/index.html) (specifically [Debezium Source Connector](https://debezium.io/documentation/reference/stable/architecture.html) and [JDBC Sink Connector](https://docs.confluent.io/kafka-connectors/jdbc/current/sink-connector/overview.html)) 

### [Web](https://github.com/microslac/web)
- Modern front-end [NextJS](https://nextjs.org/) application with modern libraries:
  - [TypeScript](https://www.typescriptlang.org/), [TailwindCSS](https://tailwindcss.com/), [Redux](https://redux.js.org/), [LangChainJS](https://js.langchain.com/v0.2/docs/introduction/)
  - [React Hook Form](https://www.react-hook-form.com/), [React Use WebSocket](https://www.npmjs.com/package/react-use-websocket), [React Virtualized](https://github.com/bvaughn/react-virtualized)

### [Others](https://github.com/orgs/microslac/repositories)
- [Users](https://github.com/microslac/users), [Teams](https://github.com/microslac/teams): Django, ORM, DRF 
- Infra: AWS, [Terraform](https://www.terraform.io/), [Terragrunt](https://terragrunt.gruntwork.io/), [NVDP](https://github.com/NVIDIA/k8s-device-plugin)
- Kube: Kubernetes, Docker, Helm, Helmfile, Taskfile,...
- Data: Strimzi, MinIO, Apache Iceberg
---
### Contact
- Email: <ledinhanhtan.stack@gmail.com>
- Social: <https://www.linkedin.com/in/tanlda/>
- GitHub: <https://github.com/tanlda>
`

export default markdown
