import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import styled, { createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import Input, {
  InputProps,
  InputRef,
  TextAreaProps,
  TextAreaRef,
} from "zmp-ui/input";

const StyledInput = styled(Input)`
  ${tw` border-transparent focus:border-transparent focus-visible:border-transparent`}
  .zaui-input-group-addon {
    ${tw`mb-3`}

    .zaui-input-label {
      ${tw`text-[15px] [line-height: 20px]  font-medium`}
    }
  }
  .zaui-input-status-error {
    ${tw`border-[ #dc1f18]`}
  }
`;

const StyledTextArea = styled(Input.TextArea)`
  ${tw` border-transparent focus:border-t-transparent focus-visible:border-transparent`}
  .zaui-input-group-addon {
    ${tw`mb-3`}

    .zaui-input-label {
      ${tw`text-[15px] [line-height: 20px]  font-medium`}
    }
  }
`;

const GolbalStyle = createGlobalStyle`
    .zaui-input-group-wrapper-status-error {
        .zaui-input-textarea {
            ${tw`border-[ #dc1f18]`}
        }
    }
`;

const AppInput: React.FC<InputProps> = forwardRef((props, ref) => {
  const inputRef = useRef<InputRef>(null);
  useImperativeHandle(ref, () => inputRef.current?.input);

  return <StyledInput {...props} ref={inputRef} />;
});

export const TextArea: React.FC<TextAreaProps> = forwardRef((props, ref) => {
  const inputRef = useRef<TextAreaRef>(null);

  useImperativeHandle(ref, () => inputRef.current?.textarea);

  useEffect(() => {
    if (inputRef.current && inputRef.current.textarea) {
      const el = inputRef.current.textarea;
      el.name = props.name || "";
    }
  }, []);

  return (
    <>
      <GolbalStyle></GolbalStyle>
      <StyledTextArea {...props} ref={inputRef} />
    </>
  );
});
export default AppInput;
