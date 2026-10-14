-- Executer dans la BASE D1 d2l-reader-db (la même que la liseuse).
CREATE TABLE IF NOT EXISTS d2l_requests(id TEXT PRIMARY KEY,name TEXT NOT NULL,email TEXT NOT NULL,book_id TEXT NOT NULL,message TEXT NOT NULL DEFAULT '',status TEXT NOT NULL DEFAULT 'pending',reader_id TEXT,invitation_id TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX IF NOT EXISTS idx_d2l_requests_status ON d2l_requests(status,created_at);
CREATE INDEX IF NOT EXISTS idx_d2l_requests_book ON d2l_requests(book_id);
CREATE TABLE IF NOT EXISTS d2l_mail_log(id TEXT PRIMARY KEY,request_id TEXT NOT NULL,kind TEXT NOT NULL,subject TEXT NOT NULL,provider_id TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX IF NOT EXISTS idx_d2l_mail_request ON d2l_mail_log(request_id);
