import React from 'react';
import { ISelect } from '../../interface';
import './form.css';

const Select = React.forwardRef(
  ({ onChange, name, label }: ISelect, ref: React.LegacyRef<HTMLSelectElement> | undefined) => (
    <div className="wrapper_input">
      <label>
        {label}
        <select name={name} ref={ref} onChange={onChange} className="Counryform">
          <option value="">--Please choose country--</option>
          <option value="Spain">Spain</option>
          <option value="Germany">Germany</option>
          <option value="Ucraine">Ucraine</option>
        </select>
      </label>
    </div>
  )
);

export default Select;
