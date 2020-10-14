import React from "react";
import { Locale, addYears } from "date-fns";
import { sv } from "date-fns/locale";

export interface DatePickerProps {
  /**
   * Change handler, fires everytime a new date
   * has been selected.
   */
  onChange: (date: Date) => void;
  /**
   * First selectable date
   */
  minDate: Date;
  /**
   * Last selectable date
   */
  maxDate: Date;
  /**
   * A `date-fns` locale object, which handles all
   * the translations of date names and layout
   * of a week. Defaults to Swedish.
   */
  locale: Locale;
  /**
   * Print long weekday names in the week grid
   */
  printLongWeekdays: boolean;
  /**
   * Hide week numbers in the month grid
   */
  hideWeekNumber: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  minDate = new Date(),
  maxDate = addYears(new Date(), 5),
  locale = sv,
  printLongWeekdays = false,
  hideWeekNumber = false,
}) => {
  const onClick = () => {
    onChange(new Date());
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>Föregående månad</button>
        <select name="year">
          <option value="2020" selected={true}>
            2020
          </option>
          <option value="2020">2021</option>
          <option value="2020">2022</option>
        </select>
        <select name="month">
          <option value="Januari">Januari</option>
          <option value="Februari">Februari</option>
          <option value="Mars">Mars</option>
          <option value="April">April</option>
          <option value="Maj">Maj</option>
          <option value="Juni">Juni</option>
          <option value="Juli">Juli</option>
          <option value="Augusti">Augusti</option>
          <option value="September" selected={true}>
            September
          </option>
          <option value="Oktober">Oktober</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <button>Nästa månad</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th scope="column">V.</th>
              <th scope="column">Mån</th>
              <th scope="column">Tis</th>
              <th scope="column">Ons</th>
              <th scope="column">Tor</th>
              <th scope="column">Fre</th>
              <th scope="column">Lör</th>
              <th scope="column">Sön</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">36</th>
              <td>
                <button>31</button>
              </td>
              <td>
                <button>1</button>
              </td>
              <td>
                <button>2</button>
              </td>
              <td>
                <button>3</button>
              </td>
              <td>
                <button>4</button>
              </td>
              <td>
                <button>5</button>
              </td>
              <td>
                <button>6</button>
              </td>
            </tr>
            <tr>
              <th scope="row">37</th>
              <td>
                <button>7</button>
              </td>
              <td>
                <button>8</button>
              </td>
              <td>
                <button>9</button>
              </td>
              <td>
                <button>10</button>
              </td>
              <td>
                <button>11</button>
              </td>
              <td>
                <button>12</button>
              </td>
              <td>
                <button>13</button>
              </td>
            </tr>
            <tr>
              <th scope="row">38</th>
              <td>
                <button>14</button>
              </td>
              <td>
                <button>15</button>
              </td>
              <td>
                <button>16</button>
              </td>
              <td>
                <button>17</button>
              </td>
              <td>
                <button>18</button>
              </td>
              <td>
                <button>19</button>
              </td>
              <td>
                <button>20</button>
              </td>
            </tr>
            <tr>
              <th scope="row">39</th>
              <td>
                <button>21</button>
              </td>
              <td>
                <button>22</button>
              </td>
              <td>
                <button>23</button>
              </td>
              <td>
                <button>24</button>
              </td>
              <td>
                <button>25</button>
              </td>
              <td>
                <button>26</button>
              </td>
              <td>
                <button>27</button>
              </td>
            </tr>
            <tr>
              <th scope="row">40</th>
              <td>
                <button>28</button>
              </td>
              <td>
                <button>29</button>
              </td>
              <td>
                <button>30</button>
              </td>
              <td>
                <button>1</button>
              </td>
              <td>
                <button>2</button>
              </td>
              <td>
                <button>3</button>
              </td>
              <td>
                <button>4</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatePicker;
