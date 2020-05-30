import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function ComponentVaultPicker({ name, value, onChange }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
    })();
  }, []);

  return (
    <div className="form-group">
      <label>档案所在地</label>
      <select
        name={name || 'vault_id'}
        value={value}
        className="form-control"
        onChange={onChange}
      >
        <option value="0">未选择</option>
        {data.map((it) => (
          <option value={it.id} key={it.id}>{it.name}</option>
        ))}
      </select>
    </div>
  );
}

ComponentVaultPicker.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
