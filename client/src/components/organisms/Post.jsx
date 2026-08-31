import PostContent from "./PostContainer";
import Button from "./Button";
 
const PostOrganism = ({ author, question, onRespond }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
    <PostContent name={author}>
      <p className="text-sm text-gray-800 leading-relaxed pt-1">{question}</p>
    </PostContent>
    <div className="pl-12">
      <Button onClick={onRespond}>Responder</Button>
    </div>
  </div>
);
 
export default PostOrganism;
 