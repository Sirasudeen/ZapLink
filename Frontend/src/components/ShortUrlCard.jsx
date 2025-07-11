import { message, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ShortUrlCard = ({ shortUrl }) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            message.success('Short URL copied!');
        } catch {
            message.error('Failed to copy!');
        }
    };

    return (
        <div
            style={{
                marginTop: 28,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #ebf4f5 0%, #caf2ef 100%)',
                borderRadius: 16,
                padding: '24px 18px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
                border: '1px solid #eee',
                transition: 'all 0.3s ease'
            }}
        >
            <Text
                strong
                style={{
                    fontSize: '1rem',
                    color: 'black',
                    letterSpacing: 0.5
                }}
            >
                Your Short URL:
            </Text>
            <br />
            <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'inline-block',
                    marginTop: 12,
                    fontSize: '1.15rem',
                    color: '#232946',
                    wordBreak: 'break-all',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target.style.color = '#4b28cc')}
                onMouseLeave={(e) => (e.target.style.color = '#232946')}
            >
                {shortUrl}
            </a>

            <button
                onClick={handleCopy}
                style={{
                    marginTop: 16,
                    marginLeft: 8,
                    padding: '8px 14px',
                    borderRadius: 10,
                    background: '#1dbde6',
                    border: 'none',
                    color: '#fff',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 3px 10px rgba(59, 40, 204, 0.25)',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.target.style.background = '#0974f1';
                    e.target.style.boxShadow = '0 4px 14px rgba(59, 40, 204, 0.35)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.background = '#1dbde6';
                    e.target.style.boxShadow = '0 3px 10px rgba(59, 40, 204, 0.25)';
                }}
            >
                <CopyOutlined style={{ marginRight: 6, fontSize: '0.9rem' }} />
            </button>
        </div>
    );
};

export default ShortUrlCard;
