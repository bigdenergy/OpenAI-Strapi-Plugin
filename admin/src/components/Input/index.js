import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { TextInput } from '@strapi/design-system/TextInput';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';
import { Typography } from '@strapi/design-system/Typography';
import { auth } from '@strapi/helper-plugin'
import { Loader } from "@strapi/design-system/Loader"  
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box } from "@strapi/design-system/Box";
 
import "./styles.css";

export const configuration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "indent",
    "outdent",
    "|",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

export default function Index({
  name,
  error,
  description,
  required,
  onChange,
  value,
  intlLabel,
  attribute,
}) {
  const { formatMessage } = useIntl();
  const [prompt, setPrompt] = useState('');
  const [err, setErr] = useState(''); 
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generateText = async () => {
    setLoading(true);
    try {
      setContent(null);
      setLoading(true);
      const response = await fetch(`/open-ai/generate-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.getToken()}` 
        },
        body: JSON.stringify({
          'model': 'text-davinci-003',
          'prompt': `${prompt}`,
          'temperature': 0.4,
          'max_tokens': 2048,
          'top_p': 1,
          'frequency_penalty': 0,
          'presence_penalty': 0
        })
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      } else {
        setLoading(false);
      } 

      const result = await response.json();

      console.log(result);
      const parsedResult = result.choices[0].text;
      setContent(parsedResult);

      onChange({ target: { name, value: parsedResult, type: attribute.type } })
    } catch (err) {
      setErr(err.message);
    }
  }

  const clearGeneratedText = async () => {
    onChange({ target: { name, value: '', type: attribute.type } });
    setContent('');
  }

  return (
    <Stack vertical>
      <Box style={{marginBottom: "12px"}}>
        <TextInput
          required={required}
          placeholder="Give me 3 hashtags for a wood e-commerce..."
          label={intlLabel ? formatMessage(intlLabel) : ''}
          name={name}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        />
      </Box>
      <Box  style={{marginBottom: "12px"}}>
        <CKEditor
        required={required}
          editor={ClassicEditor}
          disabled={false}
          name="content"
          config={configuration}
          data={!content ? "" : content}
          onReady={(editor) => editor.setData(value || "")}
          onChange={ ( event, editor ) => {
            const data = editor.getData();
            setContent(data);
            onChange({ target: { name, value: data, type: attribute.type } })
            //console.log( { event, editor, data } );
        } }         
        />
      </Box>
      {prompt ?
        <Box>
        {!loading ? (
          <Stack horizontal spacing={3}>
            <Button onClick={() => generateText()}>Generate</Button>
            <Button onClick={() => clearGeneratedText()}>Clear</Button>
          </Stack>
          ) : 
          <Stack horizontal spacing={3}>
            <Typography variant="omega" fontWeight="semiBold">
              Fetching
            </Typography>
            <Loader small/>
          </Stack>
        }
        </Box>
        :
        ""
      }
    </Stack>
  )
}