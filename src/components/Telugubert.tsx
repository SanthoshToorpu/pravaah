import React, { useState } from 'react';
import axios from 'axios';

const TeluguBert: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<
    { token_str: string; sequence: string; score: number }[]
  >([]);

  const handleSubmit = async () => {
    try {
      const response = await query({ inputs: input });
      console.log(JSON.stringify(response));
      setOutput(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const query = async (data: { inputs: string }) => {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/l3cube-pune/telugu-bert',
      data,
      {
        headers: {
          Authorization: 'Bearer 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',
        },
      }
    );
    return response.data;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center text-white font-bold">
                Telugu BERT
              </div>
            </div>
            <div className="hidden md:block">
              <div className="mt-4 flex items-baseline text-white">
                <h1>Pravaah</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">How to Use</h2>
      <ol className="list-decimal list-inside space-y-4">
        <li>
                      To use this application, enter text with a masked token (e.g., 'నా
            [MASK] కంటే బావుంది.') in the input field provided.
          
        </li>
        <li>
                      Click the "Generate" button to send a POST request to the HuggingFace
            API endpoint for the Telugu BERT model.
          
        </li>
        <li>
                      The response from the API will be displayed in the output section as a
            table, showing the predicted token (<code className="bg-gray-200 px-1 py-0.5 rounded">token_str</code>), the
            complete sequence (<code className="bg-gray-200 px-1 py-0.5 rounded">sequence</code>), and the corresponding
            score.
          
        </li>
        <li>
                      Note: This implementation assumes you have the necessary dependencies
            installed (e.g., React, Axios) and the required permissions to access
            the HuggingFace API endpoint for the Telugu BERT model.
          
        </li>
      </ol>
    </div>
          <div className="flex justify-center mt-5">
            
            <div className="mb-3 xl:w-96">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text with a masked token (e.g., 'నా [MASK] కంటే బావుంది.')"
                className="form-input px-4 py-3 rounded-md w-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Generate
            </button>
          </div>

          <div className="flex flex-col mt-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          token_str
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          sequence
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {output.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.token_str}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.sequence}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.score}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeluguBert;