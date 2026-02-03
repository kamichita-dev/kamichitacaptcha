# 🔒 Advanced CAPTCHA System v3.0

Enterprise-grade CAPTCHA system with multiple challenge types.

## ✨ Features

- 📝 Text Input CAPTCHA
- 🔢 Number Input CAPTCHA
- 🧮 Math Calculation CAPTCHA
- 🔊 Audio CAPTCHA
- 🛡️ Advanced Security
- 🔄 Auto-retry on errors
- ⏱️ 30-second timeout
- 📱 Mobile friendly
- 🚀 Auto-initialization

## 📖 Usage

### Basic

```html
<div data-captcha></div>
<script src="cap_api.js"></script>
```

### Specify Type

```html
<div data-captcha data-type="text_input"></div>
<div data-captcha data-type="number_input"></div>
<div data-captcha data-type="math_calc"></div>
<div data-captcha data-type="audio"></div>
<script src="cap_api.js"></script>
```

### With Callback

```html
<div data-captcha data-callback="onSuccess"></div>

<script>
function onSuccess(token) {
    console.log('Token:', token);
}
</script>

<script src="cap_api.js"></script>
```

### JavaScript API

```javascript
// Render CAPTCHA
AdvancedCaptcha.render('container-id', {
    challengeType: 'audio',
    callback: function(token) {
        console.log('Success:', token);
    }
});

// Get token
const token = AdvancedCaptcha.getToken();

// Reset
AdvancedCaptcha.reset();
```

## 🎯 Challenge Types

| Type | Value | Description |
|------|-------|-------------|
| Text | `text_input` | Alphanumeric characters |
| Number | `number_input` | Numeric only |
| Math | `math_calc` | Simple arithmetic |
| Audio | `audio` | Audio verification |
| Random | (empty) | Random selection |

## 🔧 Options

### data-captcha attributes

- `data-type` - Challenge type
- `data-callback` - Success callback function name
- `data-theme` - Theme (light/dark)

### JavaScript options

```javascript
{
    challengeType: 'text_input',
    callback: function(token) { },
    onError: function(error) { },
    theme: 'light',
    language: 'ja'
}
```

## 📦 Files

- `cap_api.js` - Client library
- `main.py` - Server application
- `requirements.txt` - Python dependencies
- `sample.html` - Example implementation

## 🌐 API Endpoints

**Base URL:** `https://captchaapi.kamichitateam.f5.si`

### POST /api/challenge

Create a new CAPTCHA challenge.

**Request:**
```json
{
    "domain": "example.com",
    "challenge_type": "text_input"
}
```

**Parameters:**
- `domain` (required) - Your website domain
- `challenge_type` (optional) - Challenge type: `text_input`, `number_input`, `math_calc`, `audio`

**Response:**
```json
{
    "challenge_id": "uuid-here",
    "type": "text_input",
    "description": "画像に表示されている文字を入力してください",
    "input_type": "text",
    "challenge_image": "data:image/png;base64,..."
}
```

**For audio challenges:**
```json
{
    "challenge_id": "uuid-here",
    "type": "audio",
    "description": "音声で聞こえた数字を入力してください",
    "input_type": "number",
    "challenge_audio": "data:audio/wav;base64,..."
}
```

### POST /api/verify

Verify CAPTCHA answer.

**Request:**
```json
{
    "challenge_id": "uuid-here",
    "answer": "ABC123"
}
```

**Response (Success):**
```json
{
    "success": true,
    "token": "verification-token-here",
    "message": "CAPTCHA solved successfully"
}
```

**Response (Failed):**
```json
{
    "success": false,
    "message": "Incorrect answer. Please try again.",
    "attempts_remaining": 2
}
```

### GET /api/analytics

Get system analytics.

**Response:**
```json
{
    "total_challenges": 1000,
    "successful_challenges": 850,
    "failed_challenges": 150,
    "blocked_attempts": 20,
    "active_challenges": 5
}
```

### OPTIONS /{path}

Handle CORS preflight requests.

**Response Headers:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH
Access-Control-Allow-Headers: *
Access-Control-Max-Age: 3600
```

## 🔒 Security Features

- Rate limiting (20 requests per 5 minutes)
- IP validation
- Challenge expiration (5 minutes)
- Maximum 3 attempts per challenge
- Anti-bot detection
- CORS protection
- 30-second timeout
- Automatic retry on network errors

## 📱 Browser Support

- Chrome/Edge (Desktop & Mobile)
- Firefox (Desktop & Mobile)
- Safari (Desktop & Mobile)
- Opera
- Samsung Internet

## 📄 License

Commercial License Required

## 🆘 Support

For issues or questions, please contact support.

---

**Version:** 3.0.0  
**API Endpoint:** https://captchaapi.kamichitateam.f5.si  
**Logo:** https://php.kamichitateam.f5.si/static/9bc9247bb379885dd59f2eff6f1edab7.png
