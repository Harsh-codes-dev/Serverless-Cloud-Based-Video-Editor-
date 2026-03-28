# AWS Serverless Video Editor

![Architecture](https://img.shields.io/badge/AWS-Serverless-orange)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![React](https://img.shields.io/badge/React-19-blue)

An automated video editor that uses AI to transform long-form videos into engaging short-form clips optimized for TikTok and Instagram Reels.

## 🎯 Features

- **🎬 Automated Clip Generation**: Upload a long video and get multiple short, vertical clips
- **🤖 AI-Powered Analysis**: Uses Gemini AI to identify the most exciting moments
- **📝 Audio Transcription**: Automatic transcription with VOSK MODEL
- **☁️ Fully Serverless**: Scales automatically, pay only for what you use(Our is free to use student account )
- **📊 Real-Time Status**: Track processing progress in the web interface
- **💾 Cloud Storage**: All videos stored securely in S3

## 🏗️ Architecture

```
┌─────────────┐
│   User      │
│  Uploads    │
│   Video     │
└──────┬──────┘
       │
       ▼
┌──────────────────────────────────────────────────────┐
│                      AWS Cloud                       │
│                                                      │
│  ┌────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   S3   │───▶│   Lambda     │───▶│     Step    │  │
│  │ Upload │    │  (Trigger)   │    │  Functions   │  │
│  └────────┘    └──────────────┘    └──────┬───────┘  │
│                                             │        │
│  ┌──────────────────────────────────────────┼────┐   │
│  │         Step Functions Workflow          │    │   │
│  │                                          │    │   │
│  │  1. ┌──────────────┐                     │    │   │
│  │     │ Transcribe   │ (Audio → Text)      │    │   │
│  │     └──────┬───────┘                     │    │   │
│  │            │                             │    │   │
│  │  2. ┌──────▼───────┐                     │    │   │
│  │     │  GEMINI AI    │ (Find Highlights)  │    │   │
│  │     └──────┬───────┘                     │    │   │
│  │            │                             │    │   │
│  │  3. ┌──────▼───────┐                     │    │   │
│  │     │ MediaConvert │ (Crop & Process)    │    │   │
│  │     └──────┬───────┘                     │    │   │
│  │            │                             │    │   │
│  └────────────┼─────────────────────────────┘    │   │
│               │                                  │   │
│  ┌────────────▼──────┐                           │   │
│  │   AWS OUTPUT      │                           |   |
│  │       S3          │                           │   │
│  └───────────────────┘                           │   │
│                                                  │   │
│  ┌───────────────────────────────────────────┐   │   │
│  │          API Gateway + Lambda             │   │   │
│  │  (Frontend API - Status, Downloads)       │   │   │
│  └───────────────────────────────────────────┘   │   │
└───────────────────────────────────────────────── ┘   │
       │                                               │
       ▼                                               │
┌─────────────┐                                        │
│   React     │◀──────────────────────────────────────│
│  Frontend   │
└─────────────┘
```

## 🚀 Quick Start

### Prerequisites

- AWS Account
- AWS CLI configured
- Python 3.11+
- Node.js 18+
- Gemini API key

### Deployment

1. **Clone the repository**

```bash
git clone https://github.com/Harsh-codes-dev/Serverless-Cloud-Based-Video-Editor-.git
cd SERVERLESSVIDEOEDITOR
```

3. **Configure frontend**

```bash
npm install
```

4. **Run The project**
npm run dev


## 📁 Project Structure

```
SERVERLESSVIDEOEDITOR/                 # Root folder of your project

├── node_modules/                     # All installed npm packages (auto-generated, don't edit)

├── src/                              # Main source code folder
│
│   ├── components/                   # Reusable UI components
│   │   └── ui/                       # UI-specific components
│   │       ├── Navbar.jsx            # Top navigation bar (links, branding)
│   │       ├── Progress.jsx          # Shows upload/processing progress
│   │       ├── Results.jsx           # Displays processed video results
│   │       ├── UploadBox.jsx         # File upload UI component
│   │       └── VideoAnimation.jsx    # Animations for video preview/loading
│   │
│   ├── lib/                          # Utility/helper functions
│   │   └── utils.js                  # Common reusable functions (formatting, helpers)
│   │
│   ├── pages/                        # Pages (routes/screens of app)
│   │   ├── Dashboard.jsx             # User dashboard after login
│   │   ├── Home.jsx                  # Landing page (first screen)
│   │   ├── Login.jsx                 # Login page UI + logic
│   │   ├── Output.jsx                # Final processed video output page
│   │   ├── Processing.jsx            # Shows processing state (loading screen)
│   │   ├── Signup.jsx                # User registration page
│   │   └── Upload.jsx                # Upload page (select & send video)
│   │
│   ├── services/                     # External service integrations
│   │   └── s3Upload.js               # Handles video upload to AWS S3 (or cloud storage)
│   │
│   ├── styles/                       # Custom styling files
│   │   └── style.css                 # Global/custom CSS styles
│   │
│   ├── api.js                        # API calls (backend communication)
│   ├── App.jsx                       # Main app component (routes + layout)
│   ├── config.js                     # Configuration (API URLs, keys, settings)
│   └── main.jsx                      # Entry point (renders React app)
│
├── components.json                   # UI component config (used by UI libraries like shadcn)
├── index.html                        # Root HTML file (app loads here)
├── jsconfig.json                     # JS config (path aliases, VS Code support)
├── package-lock.json                 # Exact dependency versions (auto-generated)
├── package.json                      # Project metadata + dependencies + scripts
├── postcss.config.js                 # PostCSS config (used with Tailwind CSS)
├── tailwind.config.js                # Tailwind CSS customization (theme, colors)
└── vite.config.js                   # Vite configuration (build tool settings)
```

## 🎥 How It Works

1. **Upload**: User uploads a long-form video through the React frontend
2. **Trigger**: S3 upload event triggers Lambda function
3. **Workflow Starts**: Step Functions orchestrates the entire process:
   - **Transcribe**: AWS Transcribe converts audio to text with timestamps
   - **Analyze**: Claude AI analyzes transcript to find exciting moments
   - **Process**: AWS MediaConvert crops video into vertical clips
   - **Store**: Clips saved to S3, metadata in DynamoDB
4. **Download**: User downloads completed clips from the frontend

## 💰 Cost Estimate


| Service | Cost |
|---------|------|
| AWS Transcribe | $0.24 | Ours Free alternative Vosk Model
| Claude API | $0.15 |  Ours Google gemini Free student account
| AWS MediaConvert | $0.90 | Ours FFMEG media clipper Free opensource
| Lambda | $0.20 | Tool less credit takes
| S3 Storage | $0.01 |
| **Total** | **~$0.04** | only storage an lamda credit it takes

## 🔧 Configuration

### Environment Variables

**Backend (Lambda Functions):**
```bash
JOBS_TABLE=video-editor-jobs
UPLOAD_BUCKET=video-editor-uploads
OUTPUT_BUCKET=video-editor-outputs
TRANSCRIPTS_BUCKET=video-editor-transcripts
Googlegemini_API_KEY_PARAM=/video-editor/anthropic-api-key
```

**Frontend (React):**
```bash
REACT_APP_API_ENDPOINT=https://xxxxx.execute-api.us-east-1.amazonaws.com/prod
```

## 📊 Monitoring

### View Logs

```bash
# Lambda logs
aws logs tail /aws/lambda/video-editor-transcribe-handler --follow

# Step Functions executions
aws stepfunctions list-executions --state-machine-arn <ARN>
```

### CloudWatch Metrics

- Lambda execution duration
- Error rates
- MediaConvert job status
- DynamoDB throughput

## 🛠️ Development

### Local Testing

```bash
# Test Lambda function locally
cd aws-lambdas/sentiment_analyzer
python -m pytest tests/

# Test frontend locally
cd frontend
npm start
```

### Update Lambda Functions

```bash
cd aws-infrastructure
sam build
sam deploy --no-confirm-changeset
```

## 🔒 Security

- API keys stored in AWS Systems Manager Parameter Store (SecureString)
- S3 buckets with encryption at rest
- IAM roles follow principle of least privilege
- CORS configured for frontend domain only
- API Gateway with throttling and rate limiting

## 🐛 Troubleshooting

### Common Issues

**Issue**: Transcription fails
- **Solution**: Verify video format (MP4, MOV, AVI supported)

**Issue**: MediaConvert timeout
- **Solution**: For videos >30 minutes, increase Lambda timeout

**Issue**: CORS errors
- **Solution**: Check API Gateway CORS configuration


## 📈 Scaling

The architecture is fully serverless and scales automatically:

- **Lambda**: Concurrent executions scale to demand
- **Step Functions**: Handles thousands of concurrent workflows
- **MediaConvert**: Dedicated queues for high volume
- **DynamoDB**: On-demand capacity mode



## 🙏 Acknowledgments

- AWS for serverless infrastructure
- Google Gemini for Claude AI
- React and Tailwind CSS communities

## 📧 Support

For questions or issues:
- Open a GitHub issue
- Check [AWS Documentation](https://docs.aws.amazon.com/)

---

**Built with ❤️ using AWS Serverless Technologies And Totally free using less credits**

