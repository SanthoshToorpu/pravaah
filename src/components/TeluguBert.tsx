import React, { useState } from 'react';
import axios from 'axios';
import { BertForMaskedLM, BertTokenizer } from 'transformers'; // Import BertForMaskedLM and BertTokenizer from transformers

const TeluguBert: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<
    { token_str: string; sequence: string; score: number }[]
  >([]);
  
  // Load the trained model and tokenizer
  const model = BertForMaskedLM.from_pretrained("./telugu-bert");
  const tokenizer = BertTokenizer.from_pretrained("./telugu-bert");

  const handleSubmit = async () => {
    try {
      // Tokenize the input
      const tokenizedInput = tokenizer.encode(input, { return_tensors: 'pt' });
      
      // Generate predictions using the model
      const output = model.generate(tokenizedInput, { max_length: 20, do_sample: true });
      
      // Decode the output tokens
      const decodedOutput = tokenizer.decode(output[0], { skip_special_tokens: true });
      
      // Set the output state
      setOutput([{ token_str: decodedOutput, sequence: input, score: 0 }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 shadow">
        {/* Navigation bar */}
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Input field and Generate button */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text with a masked token"
            className="form-input px-4 py-3 rounded-md w-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            onClick={handleSubmit}
            className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Generate
          </button>

          {/* Output table */}
          <div>
            <table>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Sequence</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {output.map((item, index) => (
                  <tr key={index}>
                    <td>{item.token_str}</td>
                    <td>{item.sequence}</td>
                    <td>{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeluguBert;
