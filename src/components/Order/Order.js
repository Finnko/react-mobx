import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import storesContext from '@/contexts/stores';
import { observer } from 'mobx-react';

const Order = ({ onCancel, onConfirm }) => {
    const { orderStore } = useContext(storesContext);
    const { userData, checkValidity: isFormValid, changeValue } = orderStore;

    const renderFields = () => {
        return Object.keys(userData).map((name, index) => {
            const field = userData[name];

            return (
                <Form.Group controlId={`form-${name}`} key={name}>
                    <Form.Label>
                        {field.title}
                    </Form.Label>

                    <Form.Control
                      type="text"
                      value={field.value}
                      onChange={(e) => changeValue(name, e.target.value.trim())} />
                    {
                        field.valid === false &&
                        <Form.Text className="text-danger">
                            {field.errorText}
                        </Form.Text>
                    }
                </Form.Group>
            );
        });
    }

    return (
      <div>
          <h1>Order</h1>
          <Form>
              {renderFields()}
          </Form>
          <div>
              <button
                className="btn btn-warning mr-1"
                type="button"
                onClick={onCancel}
              >
                  Back
              </button>

              <button
                className="btn btn-success"
                type="button"
                onClick={onConfirm}
                disabled={!isFormValid}
              >
                  Send
              </button>
          </div>
      </div>
    );
}

export default observer(Order);
