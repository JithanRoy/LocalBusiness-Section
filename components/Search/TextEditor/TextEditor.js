// import React, { useState, useRef } from 'react';
// import JoditEditor from 'jodit-react';


// const TextEditor = ({ placeholder }) => {
// 	const editor = useRef(null);
// 	const [content, setContent] = useState('');

// 	const config = 
// 		{
// 			readonly: false,
// 			placeholder: placeholder || 'Start typing...',
//             hidePoweredByJodit: true,
//             height: "400"
// 		}

// 	return (
//         <div>
//             <JoditEditor
//                 ref={editor}
//                 value={content}
//                 config={config}
//                 tabIndex={1}
//                 onBlur={newContent => setContent(newContent)} 
//                 onChange={newContent => {}}
//             />
//         </div>
// 	);
// };

// export default TextEditor;