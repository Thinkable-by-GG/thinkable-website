import React, { useState } from 'react';
import { useFormFields, useForm } from 'payload/components/forms';

const AIGeneratorField: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const conditionInfoField = useFormFields(([fields]) => fields.conditionInfoForAI);
  const titleField = useFormFields(([fields]) => fields.title);
  const { dispatchFields } = useForm();

  const handleGenerate = async () => {
    const conditionInfo = conditionInfoField?.value;
    const title = titleField?.value;

    if (!conditionInfo) {
      setError('Please fill in the "Condition Info for AI" field first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/conditions/generate-fields', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conditionInfo, title }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to generate fields');
      }

      const { data } = result;

      // Update form fields with generated data
      if (data.description) {
        dispatchFields({
          type: 'UPDATE',
          path: 'description',
          value: data.description,
        });
      }

      if (data.benefits && data.benefits.length > 0) {
        dispatchFields({
          type: 'UPDATE',
          path: 'benefits',
          value: data.benefits,
        });
      }

      if (data.maladaptiveBeliefs && data.maladaptiveBeliefs.length > 0) {
        dispatchFields({
          type: 'UPDATE',
          path: 'patientTrack.maladaptiveBeliefs',
          value: data.maladaptiveBeliefs,
        });
      }

      if (data.trackModules && data.trackModules.length > 0) {
        dispatchFields({
          type: 'UPDATE',
          path: 'patientTrack.trackModules',
          value: data.trackModules,
        });
      }

      setSuccess('✅ Fields generated successfully! Check below to review and edit.');
    } catch (err) {
      setError(err.message || 'Failed to generate fields');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      marginBottom: '20px',
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '16px', fontWeight: 600 }}>
        AI Field Generator
      </h3>
      <p style={{ marginBottom: '15px', fontSize: '14px', color: '#666' }}>
        Fill in the "Condition Info for AI" field below with information about the condition
        (maladaptive beliefs, psychoeducation, etc.), then click Generate to auto-populate the fields.
      </p>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
        }}
      >
        {loading ? 'Generating...' : 'Generate Fields with AI'}
      </button>

      {error && (
        <div style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '4px',
          color: '#c00',
          fontSize: '14px',
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#efe',
          border: '1px solid #cfc',
          borderRadius: '4px',
          color: '#060',
          fontSize: '14px',
        }}>
          {success}
        </div>
      )}
    </div>
  );
};

export default AIGeneratorField;
