import { sanitizeAndReturnHtml } from '../../../../utils/functions';

interface BlogDetailProps {
  title: string;
  content: string;
}

function BlogDetail({ title, content }: BlogDetailProps) {
  return (
    <div className='mt-6'>
      <div className='main_content'>
        <h1 className='text-4xl my-8'>{title}</h1>
        <ul className='my-4 opacity-90 pl-10'>
          <li className='text-2xl my-2'>
            <div className='title' dangerouslySetInnerHTML={sanitizeAndReturnHtml(content)}></div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BlogDetail;
