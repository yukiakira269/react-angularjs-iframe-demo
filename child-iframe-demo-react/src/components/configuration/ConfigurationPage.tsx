
import React, { useEffect, useState } from 'react';
import ProcessorConfirmModal from '../Modal/ConfirmModal';
import styles from './ConfigurationPage.module.css';
import $ from 'jquery';
import { render } from '@testing-library/react';

//Arrays of this page's form inputs
const INPUTS: HTMLInputElement[] = [];

//Trigger an input event for a given element
export function triggerInput(inputEleId: string, inputValue: string) {
  var input = document.getElementById(inputEleId) as HTMLInputElement;
  input.value = inputValue;
  const event = new Event("input", { bubbles: true });
  input.dispatchEvent(event);
}

//Load all inputs to the array
function loadInputs() {
  $("#configurationForm").find('input').each(function () {
    var id = $(this).attr('id')!;
    if (INPUTS.indexOf(document.getElementById(id) as HTMLInputElement) < 0) {
      INPUTS.push(
        document.getElementById(id) as HTMLInputElement
      );
    }
  });
}


function ConfigurationPage() {
  const [systemName, setSystemName] = useState('');
  const [processor, setProcessor] = useState('');

  /** Handling iframe communication */
  //Receiving messages (Parent -> Child)
  const messageHandler = (e: MessageEvent) => {
    if (e.origin.startsWith('http://localhost:8000')) {
      triggerInput("systemName", e.data);
      //Remove the EventListener as the listener is added everytime the page is refreshed
      window.removeEventListener('message', messageHandler);
    }
  }
  window.addEventListener('message', messageHandler, false);
  //Set the systemName's state to the value of the form's input
  const iframeCommunicationHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSystemName(event.target.value);
  }
  //Sending message back to the parent whenever the systemName changes
  useEffect(() => {
    window.parent.postMessage(systemName, 'http://localhost:8000');
  }, [systemName]);


  /** Handling auto-rendering when the user switches tabs, provided that the
   * user stays in the same session
   */
  //Loading all form's inputs (Triggered per re-render)
  useEffect(() => {
    loadInputs();
    if (sessionStorage.length !== 0) {
      INPUTS.forEach((inputElement) => {
        var inputValue = sessionStorage.getItem(inputElement.id);
        if (inputValue !== null && inputValue.length !== 0) {
          //Specifically tailored for the processor Select element
          if (inputElement.id === "processorRealInput") {
            triggerInput("processor", inputValue);
            (document.getElementById("processor") as HTMLSelectElement).disabled = true;
          }
          //Other normal inputs elements
          else {
            triggerInput(inputElement.id, inputValue);
          }
        }
      });
    }
  }, []);

  //Set the processor Name
  function processorSelected() {
    var processorSelectElement = (document.getElementById("processor") as HTMLSelectElement);
    var processorName: string;
    if (processorSelectElement.value.length !== 0) {
      processorName = processorSelectElement.value;
      setProcessor(processorName)
    } else {
      return;
    }
  }

  //Handle autosaving
  const autosave = debounce(saveData, 500);

  //Save data in session => Swicth to db later
  function saveData() {
    INPUTS.forEach((inputElement) => {
      sessionStorage.setItem(inputElement.id, inputElement.value);
    });
  }

  //500ms debounce to avoid bottleneck
  function debounce(func: Function, wait: number) {
    var timeout: any;
    return function (this: Function) {
      var context = this;
      var args = arguments;
      //The function to be called later
      var later = function () {
        func.apply(context, args);
      };
      //Reset the timeout obj per input
      clearTimeout(timeout);
      //Schedule the function
      timeout = setTimeout(later, wait);
    };
  };

  return (
    <div>
      <div className="pt-5">
        <form id="configurationForm" onInput={autosave}>
          <div className="was-validated">
            <div className="form-group row pt-3" >
              <label
                className="col-md-2 offset-sm-1 col-form-label"
                htmlFor="systemName">
                System Name:  <span className={styles.required}>*</span>
              </label>
              <div className="col-md-4 offset-sm-1">
                <input
                  className="form-control"
                  type="text"
                  id="systemName"
                  name="systemName"
                  required
                  onInput={iframeCommunicationHandler}
                  value={systemName}
                />
              </div>
            </div>
            <div className="form-group row pt-3" >
              <label
                className="col-md-2 offset-sm-1 col-form-label"
                htmlFor="processor">
                Processor: <span className={styles.required}>*</span>
              </label>
              <br />
              <div className="col-md-4 offset-sm-1">
                <select defaultValue={processor} className={`form-control form-select ${styles.select}`}
                  id="processor"
                  name="processor"
                  required
                  onInput={processorSelected}
                  onChange={() => {
                    render(
                      <ProcessorConfirmModal processorName={processor} />
                    )
                  }}
                >
                  <option value="" disabled>Please select a processor</option>
                  <option value="First processor">First processor</option>
                  <option value="Second processor">Second processor</option>
                  <option value="Third processor">Third processor</option>
                </select>
                <input
                  type="hidden"
                  name="processorRealInput"
                  id="processorRealInput"
                  className="form-control"
                  value={processor}
                />
              </div>
            </div>
          </div>
          <div className="form-group row pt-3" >
            <label
              className="col-md-2 offset-sm-1 col-form-label"
              htmlFor="customerName">
              Customer Name:{" "}
            </label>
            <br />
            <div className="col-md-4 offset-sm-1">
              <input
                className="form-control"
                type="text"
                id="customerName"
                name="customerName"
                placeholder="Customer Name"
              />
            </div>
            <br />
          </div>
          <div className="form-group row pt-3" >
            <label
              className="col-md-2 offset-sm-1 col-form-label"
              htmlFor="addressLine1">
              Address Line 1:{" "}
            </label>
            <br />
            <div className="col-md-4 offset-sm-1">
              <input
                className="form-control"
                type="text"
                id="addressLine1"
                name="addressLine1"
                placeholder="Address Line 1"
              />
            </div>
            <br />
          </div>
          <div className="form-group row pt-3" >
            <label
              className=" col-md-2 offset-sm-1 col-form-label"
              htmlFor="addressLine2">
              Address Line 2:{" "}
            </label>
            <br />
            <div className="col-md-4 offset-sm-1">
              <input
                className="form-control"
                type="text"
                id="addressLine2"
                name="AddressLine2"
                placeholder="Address Line 2"
              />
            </div>
            <br />
          </div>
          <div className="form-group row pt-3" >
            <label
              className=" col-md-2 offset-sm-1 col-form-label"
              htmlFor="city">
              City:{" "}
            </label>
            <br />
            <div className="col-md-4 offset-sm-1">
              <input className="form-control"
                type="text"
                id="city"
                name="City"
                placeholder="City" />
            </div>
            <br />
          </div>

          <div className="form-group row pt-3" >
            <label
              className="col-md-2 offset-sm-1 col-form-label"
              htmlFor="stateProvince">
              State Province:{" "}
            </label>
            <br />
            <div className="col-md-4 offset-sm-1">
              <input
                className="form-control"
                type="text"
                id="stateProvince"
                name="StateProvince"
                placeholder="State\Province"
              />
            </div>
            <br />
          </div>
          <div className="form-group row pt-3" >
            <label
              className="col-md-2 offset-sm-1 col-form-label"
              htmlFor="zipCode">
              Zip/Postal Code:{" "}
            </label>
            <br />
            <div className="col-md-4 offset-sm-1">
              <input
                className="form-control"
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="ZIP Code"
              />
            </div>
            <br />
          </div>
          <div className="form-group row pt-3" >
            <label
              className="col-md-2 offset-sm-1 col-form-label"
              htmlFor="countryRegion">
              Coutry Region:{" "}
            </label>
            <br />
            <div className="col-md-4 offset-sm-1">
              <input
                className="form-control"
                type="text"
                id="countryRegion"
                name="countryRegion"
                placeholder="Country/Region"
              />
              <small className="text-muted float-end">
                <span className={styles.required}>*</span>
                Required field
              </small>
            </div>
            <br />
          </div>
        </form>
      </div>
    </div >

  );
}

export default ConfigurationPage;
