import PostContent from "../atoms/PostContainer";
import Button from "../atoms/Button";
 
const Answer = ({ author, answer, onRespond }) => (
  <div className="bg-inherit border border-gray-200 rounded-lg p-3 flex flex-col gap-3">
    <PostContent name={author}>
      <p className="text-sm text-negro-txt leading-relaxed pt-1">{answer}</p>
    </PostContent>
    <div className="pl-12">
      <button className="px-4 py-1 bg-gray-900 text-white text-xs font-medium rounded-full hover:bg-gray-700 transition"
                    onClick={onRespond}>Responder</button>
    </div>
  </div>
);
 
export default Answer;
 