# Development Setup Guide
## Narkin's Builders - Comment System

### 🚀 Quick Start for New Developers

#### **Step 1: Clone and Install**
```bash
git clone https://github.com/your-username/narkins-builders.git
cd narkins-builders
bun install
```

#### **Step 2: Environment Setup**
```bash
# Copy the environment template
cp .env.example .env.local

# Update .env.local with actual values (see below)
```

#### **Step 3: Database Connection**
```bash
# Test database connection
bun run scripts/test-database.js

# Expected output: All tests should pass ✅
```

#### **Step 4: Development Server**
```bash
bun run dev
```

---

### 🔧 Environment Variables Setup

#### **Database Credentials**
Contact the **project admin** for:
- Database username
- Database password
- Database name
- Confirm database host

#### **Security Keys**
1. **JWT Secret**: Generate with `openssl rand -base64 32`
2. **reCAPTCHA**: Get keys from [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin)

#### **Required Variables**
Update these in your `.env.local`:
```env
DB_HOST=srv1567.hstgr.io  # Confirmed host
DB_USER=u762864790_narkins  # Example format
DB_PASSWORD=your-actual-password  # Get from admin
DB_NAME=u762864790_comments  # Example format
```

---

### 🗄️ Database Setup

#### **Database Schema**
The database has 5 tables:
- `blog_comments` - Main comments storage
- `comment_likes` - User likes tracking
- `admin_users` - Admin authentication
- `moderation_logs` - Moderation audit trail
- `blog_stats` - Real-time engagement metrics

#### **Database Access**
- **Host**: `srv1567.hstgr.io`
- **Remote Access**: Any Host enabled for development
- **phpMyAdmin**: Available through Hostinger panel

#### **Testing Database**
```bash
# Run the comprehensive test
bun run scripts/test-database.js

# Should show:
✅ Database connection successful
✅ All 5 tables found
✅ Sample data operations working
✅ Connection pooling operational
```

---

### 📝 Comment System Features

#### **Core Functionality**
- **Multi-language spam detection** (English, Urdu, Hindi, Roman Urdu)
- **Auto-approval system** with configurable thresholds
- **Real-time likes** with IP-based deduplication
- **Admin moderation** with audit logs
- **Blog statistics** auto-updated via triggers

#### **Contact Integration**
- **Phone**: +923203243970
- **Integration**: Embedded in all comment CTAs
- **Context**: Property inquiries from blog engagement

#### **Security Features**
- **Rate limiting**: 5 comments per hour per IP
- **Input validation**: Server-side sanitization
- **SQL injection prevention**: Parameterized queries
- **XSS protection**: Content sanitization

---

### 🚀 API Endpoints (Day 2+)

#### **Comment Operations**
- `GET /api/comments/[slug]` - Retrieve approved comments
- `POST /api/comments/[slug]` - Submit new comment
- `PUT /api/comments/[slug]` - Update comment (admin)
- `DELETE /api/comments/[slug]` - Delete comment (admin)

#### **Like Operations**
- `POST /api/likes/[commentId]` - Toggle like
- `GET /api/likes/[commentId]` - Get like count

#### **Admin Operations**
- `GET /api/admin/comments` - Pending comments
- `POST /api/admin/comments/approve` - Approve comment
- `POST /api/admin/comments/reject` - Reject comment

---

### 🎯 Development Workflow

#### **Day 1**: Database Foundation ✅
- Database schema created
- Connection layer implemented
- Test suite operational

#### **Day 2**: API Development
- Comment submission API
- Comment retrieval API
- Like/unlike functionality
- Auto-moderation system

#### **Day 3**: Frontend Components
- Comment form component
- Comments display component
- Like buttons and counters
- Admin moderation interface

#### **Day 4**: Integration & Testing
- Blog integration
- Performance optimization
- Security hardening
- Production deployment

---

### 🔒 Security Best Practices

#### **Environment Variables**
- **Never commit** `.env.local` to Git
- **Use templates** (`.env.example`) for team sharing
- **Rotate secrets** regularly
- **Separate configs** for dev/staging/production

#### **Database Security**
- **Parameterized queries** only
- **Input validation** on all endpoints
- **Rate limiting** on submission endpoints
- **IP whitelisting** for production

#### **Code Security**
- **Content sanitization** before display
- **CORS configuration** for API endpoints
- **Authentication** for admin endpoints
- **Audit logging** for all admin actions

---

### 📞 Support & Contact

#### **Technical Issues**
- **Database connection problems**: Check IP whitelisting
- **Environment setup issues**: Verify `.env.local` format
- **API development questions**: Check existing patterns

#### **Project Contact**
- **Phone**: +923203243970
- **Context**: Development support and database access
- **Hours**: Business hours Pakistan time

#### **Emergency Access**
- **Database**: Contact project admin immediately
- **Vercel**: Team access through organization
- **GitHub**: Repository access via organization

---

### 📊 Performance Targets

#### **Database Performance**
- **Query response**: <100ms average
- **Connection pooling**: 10 concurrent connections
- **Bulk operations**: <500ms for 100 records

#### **API Performance**
- **Comment submission**: <200ms response
- **Comment retrieval**: <150ms response
- **Like operations**: <100ms response

#### **Frontend Performance**
- **Comment loading**: <300ms initial load
- **Like interactions**: <100ms response
- **Form submissions**: <500ms with validation

---

**Last Updated**: Day 1 Complete  
**Status**: Database Foundation Ready ✅  
**Next Phase**: API Development (Day 2)  
**Contact**: +923156893331 for development support