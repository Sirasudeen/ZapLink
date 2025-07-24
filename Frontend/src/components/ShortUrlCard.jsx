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
      className="mt-7 text-center bg-gradient-to-br from-[#ebf4f5] to-[#caf2ef] rounded-xl p-6 border border-gray-200 shadow-md transition-all duration-300"
    >
      <Text
        strong
        className="text-base font-semibold text-black tracking-wide"
      >
        Your Short URL:
      </Text>

      <br />

      <a
        href={`https://${shortUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-lg font-semibold text-[#232946] break-all no-underline transition-colors duration-300 hover:text-[#4b28cc]"
      >
        {shortUrl}
      </a>

      <button
        onClick={handleCopy}
        className="mt-4 ml-2 px-4 py-2 rounded-lg bg-[#1dbde6] text-white font-medium text-sm inline-flex items-center shadow-md transition-all duration-300 hover:bg-[#0974f1] hover:shadow-lg"
      >
        <CopyOutlined className="mr-1 text-sm" />
      </button>
    </div>

  );
};

export default ShortUrlCard;
