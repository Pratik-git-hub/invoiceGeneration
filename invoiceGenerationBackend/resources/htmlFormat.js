import converter from "number-to-words";

let htmlFormat = (data, rows) => {
  let ms = data.Ms
  let invoiceNo = data.InvoiceNo
  let invoiceDate = data.InvoiceDate
  let DC = data.DC
  let DCDate = data.DCDate
  let PONo = data.PONo
  let PODate = data.PODate
  let Gstin = data.GSTINNumber
  let vendorCode = data.vendorCode

  let TaxableValuePerItem
  let CGSTAmountPerItem
  let SGSTAmountPerItem
  let TotalAmountWithGstPerItem
  let TotalTaxableValue = 0
  let TotalCGSTAmount = 0
  let TotalSGSTAmount = 0
  let TotalAmountWithGst = 0

  let dummyrows = []

  function insertBreaks(inputString) {
    // Insert <br> after every 40 characters
    const stringWithBreaks40 = inputString.replace(
      /.{50}/g,
      (match, offset) => {
        return offset > 0 ? "<br>" + match : match;
      }
    );

    // Insert <br> after every 80 characters in the modified string
    const stringWithBreaks80 = stringWithBreaks40.replace(
      /.{100}/g,
      (match, offset) => {
        return offset > 0 ? "<br>" + match : match;
      }
    );

    return stringWithBreaks80;
  }

  ms = insertBreaks(data.Ms);

  for (let i = 0; i < rows.length; i++) {
    TaxableValuePerItem = rows[i].rate * rows[i].Qty;
    CGSTAmountPerItem = (TaxableValuePerItem * rows[i].Cgst) / 100;
    SGSTAmountPerItem = (TaxableValuePerItem * rows[i].Sgst) / 100;
    TotalAmountWithGstPerItem =
      CGSTAmountPerItem + SGSTAmountPerItem + TaxableValuePerItem;
    TotalTaxableValue += TaxableValuePerItem;
    TotalCGSTAmount += CGSTAmountPerItem;
    TotalSGSTAmount += SGSTAmountPerItem;
    TotalAmountWithGst += TotalAmountWithGstPerItem;
  }

  TotalTaxableValue =
    Math.round((TotalTaxableValue + Number.EPSILON) * 100) / 100;
  TotalCGSTAmount = Math.round((TotalCGSTAmount + Number.EPSILON) * 100) / 100;
  TotalSGSTAmount = Math.round((TotalSGSTAmount + Number.EPSILON) * 100) / 100;
  TotalAmountWithGst =
    Math.round((TotalAmountWithGst + Number.EPSILON) * 100) / 100;
  let TotalAmountInWords = converter.toWords(TotalAmountWithGst);

  for (let i = 0; i < 20 - rows.length; i++) {
    dummyrows.push({
      id: "",
      Particulars: "",
      HSNSACCode: "",
      Units: "",
      Qty: "",
      rate: "",
      Cgst: "",
      Sgst: "",
    });
  }

  let format = `
    
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" >
    <html >
    
    <head>
    
    <style>
        table
         {mso-displayed-decimal-separator:"\.";
         mso-displayed-thousand-separator:"\,";}
        @page
         {
         mso-header-data:"";
         mso-footer-data:"";
         margin:0.75in 0.25in 0.75in 0.25in;
         mso-header-margin:0.3in;
         mso-footer-margin:0.3in;
         mso-page-orientation:Portrait;
         mso-horizontal-page-align:center;
         mso-vertical-page-align:center;
         }
        tr
         {mso-height-source:auto;
         mso-ruby-visibility:none;}
        col
         {mso-width-source:auto;
         mso-ruby-visibility:none;}
        br
         {mso-data-placement:same-cell;}
        ruby
         {ruby-align:left;}
        .style0
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         mso-protection:locked visible;
         mso-style-name:Normal;
         mso-style-id:0;}
        .font10
         {
         color:#000000;
         font-size:8.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif; }
        .font12
         {
         color:#000000;
         font-size:7.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif; }
        .font14
         {
         color:#000000;
         font-size:9pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif; }
        .font15
         {
         color:#000000;
         font-size:26pt;
         font-weight:700;
         font-style:normal;
         font-family:'Sitka Text Semibold',sans-serif; }
        td
         {mso-style-parent:style0;
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         mso-protection:locked visible;
         mso-ignore:padding;}
        .x15
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         mso-protection:locked visible;
         }
        .x21
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x22
         {
         mso-number-format:'0';
         text-align:center;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x23
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x24
         {
         mso-number-format:'0';
         text-align:center;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x25
         {
         mso-number-format:'0\.0';
         text-align:left;
         vertical-align:top;
         white-space:nowrap;
         mso-char-indent-count:2;
         padding-left:20px;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x26
         {
         mso-number-format:'0\.0%';
         text-align:center;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x27
         {
         mso-number-format:'\\₹\#\,\#\#0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x28
         {
         mso-number-format:General;
         text-align:general;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x29
         {
         mso-number-format:General;
         text-align:general;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x30
         {
         mso-number-format:'0\.0';
         text-align:left;
         vertical-align:top;
         white-space:nowrap;
         mso-char-indent-count:2;
         padding-left:20px;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x31
         {
         mso-number-format:'0\.0%';
         text-align:center;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x32
         {
         mso-number-format:'_ \[$₹-4009\]\\ * \#\,\#\#0\.00_ \;_ \[$₹-4009\]\\ * \\-\#\,\#\#0\.00_ \;_ \[$₹-4009\]\\ * \#0022-\#0022??_ \;_ \@_ ';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x33
         {
         mso-number-format:'_ \[$₹-4009\]\\ * \#\,\#\#0\.00_ \;_ \[$₹-4009\]\\ * \\-\#\,\#\#0\.00_ \;_ \[$₹-4009\]\\ * \#0022-\#0022??_ \;_ \@_ ';
         text-align:center;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x34
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x35
         {
         mso-number-format:'_ \[$₹-4009\]\\ * \#\,\#\#0\.00_ \;_ \[$₹-4009\]\\ * \\-\#\,\#\#0\.00_ \;_ \[$₹-4009\]\\ * \#0022-\#0022??_ \;_ \@_ ';
         text-align:left;
         vertical-align:top;
         white-space:nowrap;
         mso-char-indent-count:1;
         padding-left:10px;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x36
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x37
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x38
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x39
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x40
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x41
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x42
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x43
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         mso-protection:locked visible;
         }
        .x44
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x45
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:4;
         padding-left:40px;
         background:auto;
         mso-pattern:auto;
         font-size:9.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x46
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:4;
         padding-left:40px;
         background:auto;
         mso-pattern:auto;
         font-size:9.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         mso-protection:locked visible;
         }
        .x47
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:4;
         padding-left:40px;
         background:auto;
         mso-pattern:auto;
         font-size:9.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x48
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x49
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x50
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x51
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:bottom;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:8;
         padding-left:80px;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x52
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:bottom;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:8;
         padding-left:80px;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x53
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:bottom;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:8;
         padding-left:80px;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x54
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x55
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         mso-protection:locked visible;
         }
        .x56
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x57
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         mso-char-indent-count:8;
         
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x58
         {
         mso-number-format:'\\₹0\.00';
         text-align:left;
         vertical-align:top;
         white-space:nowrap;
         mso-char-indent-count:8;
         padding-left:80px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         mso-protection:locked visible;
         }
        .x59
         {
         mso-number-format:'\\₹0\.00';
         text-align:left;
         vertical-align:top;
         white-space:nowrap;
         mso-char-indent-count:8;
         padding-left:80px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x60
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x61
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x62
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x63
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:7;
         
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x64
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:7;
         padding-left:70px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x65
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:7;
         padding-left:70px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x66
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x67
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x68
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x69
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:9pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x70
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x71
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x72
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x73
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x74
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x75
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:bottom;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x76
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:bottom;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x77
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:bottom;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x78
         {
         mso-number-format:General;
         text-align:Right;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:9;
         padding-right:90px;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x79
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:9;
         padding-left:90px;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x80
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:9;
         padding-left:90px;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x81
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         mso-char-indent-count:3;
         padding-right:30px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x82
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         mso-char-indent-count:3;
         padding-right:30px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x83
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         mso-char-indent-count:3;
         padding-right:30px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x84
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:bottom;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x85
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:bottom;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x86
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:bottom;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x87
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x88
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x89
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x90
         {
         mso-number-format:General;
         text-align:right;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:7;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x91
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:7;
         padding-left:70px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x92
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:7;
         padding-left:70px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x93
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x94
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x95
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x96
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x97
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:1;
         padding-left:10px;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #123332;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x98
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:1;
         padding-left:10px;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x99
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x100
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x101
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x102
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x103
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:1;
         padding-left:10px;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x104
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:1;
         padding-left:10px;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x105
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x106
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x107
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x108
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x109
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         mso-protection:locked visible;
         }
        .x110
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x111
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x112
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x113
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x114
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x115
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         mso-protection:locked visible;
         }
        .x116
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x117
         {
         mso-number-format:General;
         text-align:general;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x118
         {
         mso-number-format:'0';
         text-align:right;
         vertical-align:middle;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x119
         {
         mso-number-format:'0';
         text-align:right;
         vertical-align:middle;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x120
         {
         mso-number-format:General;
         text-align:right;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x121
         {
         mso-number-format:'0';
         text-align:left;
         vertical-align:middle;
         white-space:nowrap;
         mso-char-indent-count:1;
         padding-left:10px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x122
         {
         mso-number-format:'0';
         text-align:left;
         vertical-align:middle;
         white-space:nowrap;
         mso-char-indent-count:1;
         padding-left:10px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x123
         {
         mso-number-format:'0';
         text-align:left;
         vertical-align:middle;
         white-space:nowrap;
         mso-char-indent-count:1;
         padding-left:10px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x124
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:11.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x125
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:11.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x126
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:11.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x127
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:11.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x128
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:11.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         mso-protection:locked visible;
         }
        .x129
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:11.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x130
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:11.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x131
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:11.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x132
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:11.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x133
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x134
         {
         mso-number-format:General;
         text-align:general;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x135
         {
         mso-number-format:General;
         text-align:general;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x136
         {
         mso-number-format:General;
         text-align:general;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         mso-protection:locked visible;
         }
        .x137
         {
         mso-number-format:General;
         text-align:general;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x138
         {
         mso-number-format:General;
         text-align:general;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x139
         {
         mso-number-format:General;
         text-align:general;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x140
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x141
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8.5pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x142
         {
         mso-number-format:General;
         text-align:general;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x143
         {
         mso-number-format:'0';
         text-align:left;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid windowtext;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x144
         {
         mso-number-format:General;
         text-align:general;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid windowtext;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x145
         {
         mso-number-format:'0';
         text-align:left;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid windowtext;
         border-bottom:1px solid #000000;
         border-left:1px solid windowtext;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x146
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid windowtext;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x147
         {
         mso-number-format:General;
         text-align:general;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid windowtext;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x148
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:2;
         padding-left:20px;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x149
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:middle;
         white-space:normal;word-wrap:break-word;
         mso-char-indent-count:2;
         padding-left:20px;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x150
         {
         mso-number-format:'_ \[$₹-4009\]\\ * \#\,\#\#0\.00_ \;_ \[$₹-4009\]\\ * \\-\#\,\#\#0\.00_ \;_ \[$₹-4009\]\\ * \#0022-\#0022??_ \;_ \@_ ';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x151
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x152
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid windowtext;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x153
         {
         mso-number-format:'_ \[$₹-4009\]\\ * \#\,\#\#0\.00_ \;_ \[$₹-4009\]\\ * \\-\#\,\#\#0\.00_ \;_ \[$₹-4009\]\\ * \#0022-\#0022??_ \;_ \@_ ';
         text-align:left;
         vertical-align:top;
         white-space:nowrap;
         mso-char-indent-count:1;
         padding-left:10px;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid windowtext;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x154
         {
         mso-number-format:'0\.0%';
         text-align:center;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x155
         {
         mso-number-format:'\\₹0\.00';
         text-align:right;
         vertical-align:top;
         white-space:nowrap;
         mso-char-indent-count:3;
         padding-right:30px;
         background:#CCE6FD;
         mso-pattern:auto none;
         color:#000000;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid windowtext;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x156
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x157
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x158
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:#CCE6FD;
         mso-pattern:auto none;
         font-size:8pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:1px solid windowtext;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x159
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:nowrap;
         background:auto;
         mso-pattern:auto;
         color:#000000;
         font-size:10pt;
         font-weight:400;
         font-style:normal;
         font-family:'Times New Roman',sans-serif;
         border-top:none;
         border-right:1px solid windowtext;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x160
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:7.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x161
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:7.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         mso-protection:locked visible;
         }
        .x162
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:7.5pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x163
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:9pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         mso-protection:locked visible;
         }
        .x164
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:9pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:none;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x165
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:9pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x166
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:9pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x167
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:9pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:1px solid #000000;
         border-bottom:1px solid #000000;
         border-left:none;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x168
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:none;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x169
         {
         mso-number-format:General;
         text-align:left;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:8pt;
         font-weight:400;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:none;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        .x170
         {
         mso-number-format:General;
         text-align:center;
         vertical-align:top;
         white-space:normal;word-wrap:break-word;
         background:auto;
         mso-pattern:auto;
         font-size:10pt;
         font-weight:700;
         font-style:normal;
         font-family:'Trebuchet MS',sans-serif;
         border-top:1px solid #000000;
         border-right:none;
         border-bottom:1px solid #000000;
         border-left:1px solid #000000;
         mso-diagonal-down:none;
         mso-diagonal-up:none;
         mso-protection:locked visible;
         }
        
        </style>
        <!--[if gte mso 9]><xml>
         <x:ExcelWorkbook>
          <x:ExcelWorksheets>
           <x:ExcelWorksheet>
            <x:Name>Table 1</x:Name>
        <x:WorksheetOptions>
         <x:StandardWidth>1792</x:StandardWidth>
         <x:FitToPage/>
         <x:Print>
          <x:FitHeight>0</x:FitHeight>
          <x:ValidPrinterInfo/>
          <x:PaperSizeIndex>9</x:PaperSizeIndex>
          <x:Scale>91</x:Scale>
          <x:HorizontalResolution>600</x:HorizontalResolution>
          <x:VerticalResolution>600</x:VerticalResolution>
         </x:Print>
         <x:Selected/>
        </x:WorksheetOptions>
           </x:ExcelWorksheet>
          </x:ExcelWorksheets>
          <x:WindowHeight>8940</x:WindowHeight>
          <x:WindowWidth>23040</x:WindowWidth>
          <x:WindowTopX>0</x:WindowTopX>
          <x:WindowTopY>0</x:WindowTopY>
          <x:RefModeR1C1/>
          <x:TabRatio>600</x:TabRatio>
          <x:ActiveSheet>0</x:ActiveSheet>
         </x:ExcelWorkbook>
        </xml><![endif]-->
        </head>
        <body link='blue' vlink='purple' >
        
        <table border='0' cellpadding='0' cellspacing='0' width='734' style='border-collapse: 
         collapse;table-layout:fixed;width:700pt;height:890pt'>
         <col width='33' style='mso-width-source:userset;width:22.75pt'/>
         <col width='133' style='mso-width-source:userset;width:99.75pt'/>
         <col width='66' style='mso-width-source:userset;width:49.5pt'/>
         <col width='36' style='mso-width-source:userset;width:27pt'/>
         <col width='34' style='mso-width-source:userset;width:25.5pt'/>
         <col width='17' style='mso-width-source:userset;width:12.75pt'/>
         <col width='56' style='width:42pt'/>
         <col width='60' style='mso-width-source:userset;width:45pt'/>
         <col width='41' style='mso-width-source:userset;width:30.75pt'/>
         <col width='56' style='width:42pt'/>
         <col width='52' style='mso-width-source:userset;width:39pt'/>
         <col width='29' style='mso-width-source:userset;width:21.75pt'/>
         <col class='x159' width='38' style='mso-width-source:userset;background:none;width:28.5pt'/>
         <col width='83' style='mso-width-source:userset;width:62.25pt'/>
         <tr height='148' style='mso-height-source:userset;height:111pt'>
        <td colspan='14' height='146' class='x170' width='734' style='text-decoration:none;border-right:1px solid #000000;border-bottom:1px solid #000000;height:109.5pt;'><a href="mailto:sudhaienterprises@gmail.com" style='text-decoration:none;' target="_parent"><span style='font-size:10pt;color:#000000;font-weight:700;text-decoration:none;text-line-through:none;font-family:"Trebuchet MS",sans-serif;'><font class="font15" style="text-decoration: none;">SUDHAI ENTERPRISES</font><font class="font2" style="text-decoration: none;"><br></font><font class="font14" style="text-decoration: none;">DEOLAI ROAD, PLOT NO.22 GUT NO.92, VAIJAUNT NAGAR, SATARA PARISAR, AURANGABAD, Aurangabad,<br>AURANGABAD,<span style='mso-spacerun:yes;'>&nbsp; </span>Maharashtra,<span style='mso-spacerun:yes;'>&nbsp; </span>431005,</font><font class="font10" style="text-decoration: none;"><br></font><font class="font14" style="text-decoration: none;">9370575500,<br>sudhaienterprises@gmail.com</font><font class="font10" style="text-decoration: none;"><br></font><font class="font4" style="text-decoration: none;">GSTIN : 27AIGPD0772J1ZB PAN No: AIGPDO772J</font></span></a></td>
         </tr>
         <tr height='15' style='mso-height-source:userset;height:11.55pt'>
        <td colspan='14' rowspan='2' mso-row-span='3' height='23' class='x124' style='border-right:1px solid #000000;border-bottom:1px solid #000000;height:17.4pt;'>TAX INVOICE</td>
         </tr>
         <tr height='8' style='mso-height-source:userset;height:6.6pt'>
         </tr>
        <tr height='0' style='display:none'>
         </tr>
         <td height=18 class=xl793369 width=64 style='height:13.2pt;border-left:1pt solid black;vertical-align:center;border-top:none;
      width:48pt'>&nbsp;M/s<span style='mso-spacerun:yes'>   </span>:<span
      style='mso-spacerun:yes'>  </span></td>
      <td colspan=6 rowspan=3 class=xl1673369 width=384 style='border-right:1pt solid black;
      width:288pt'><p>&nbsp;&nbsp;${ms}<br/> </p></td>
      <td colspan=4 class=xl793369 width=256 style='border-left:1pt solid black;width:192pt'>&nbsp;Invoice
      No.<span style='mso-spacerun:yes'></span>:&nbsp;&nbsp;    ${invoiceNo}       </td>
      <td colspan=3 class=xl1703369 width=192 style='border-right:1pt solid black;
      width:144pt'>&nbsp;Dt :<span style='mso-spacerun:yes'>&nbsp;&nbsp; ${invoiceDate} </span></td>
     </tr>
     <tr height=18 style='height:13.2pt'>
      <td rowspan=2 height=36 class=xl1723369 width=64 style='border-left:1pt solid black;height:26.4pt;
      width:48pt'>&nbsp;</td>
      <td colspan=4 class=xl823369 width=256 style='border-left:1pt solid black;width:192pt'>&nbsp;D.C.
      No.<span style='mso-spacerun:yes'>   </span>:&nbsp;&nbsp;${DC}</td>
      <td colspan=3 class=xl1763369 width=192 style='border-right:1pt solid black;
      width:144pt'>&nbsp;Dt :<span style='mso-spacerun:yes'>&nbsp;&nbsp; ${DCDate}   </span></td>
     </tr>
     <tr height=18 style='height:13.2pt'>
      <td colspan=4 height=18 class=xl823369 width=256 style='height:13.2pt;
      border-left:1pt solid black;width:192pt'>&nbsp;P.O No.<span
      style='mso-spacerun:yes'>                  </span>:<span
      style='mso-spacerun:yes'>  </span>&nbsp;&nbsp; ${PONo} </td>
      <td colspan=3 class=xl833369 width=192 style='border-right:1pt solid black;
      width:144pt'>&nbsp;Dt :<span style='mso-spacerun:yes'> &nbsp;&nbsp;${PODate}   </span></td>
     </tr>
     <tr height=18 style='height:13.2pt'>
      <td colspan=7 height=18 class=xl1783369 width=448 style='border-left:1pt solid black;border-top:1pt solid black;border-right:1pt solid black;
      height:13.2pt;width:336pt'>&nbsp;Party's GSTIN No:<span
      style='mso-spacerun:yes'> &nbsp; &nbsp;${Gstin}    </span></td>
      <td colspan=7 class=xl1813369 width=448 style='border-right:1pt solid black;
      border-left:;width:336pt'>&nbsp;Vendor Code<span
      style='mso-spacerun:yes'></span>:&nbsp; ${vendorCode}</td>
     </tr>
         <tr height='20' style='mso-height-source:userset;height:15pt'>
        <td rowspan='2' height='39' class='x95' style='height:29.25pt;'><font class="font4" style="text-decoration: none;">Sr.<br></font><font class="font4" style="text-decoration: none;">No.</font></td>
        <td rowspan='2' height='39' class='x97' style='border-left:1px solid #000000;border-bottom:1px solid #000000;height:29.25pt;'><font class="font4" style="text-decoration: none;">Particulars</font></td>
        <td rowspan='2' height='39' class='x97' style='border-left:1px solid #000000;border-bottom:1px solid #000000;height:29.25pt;'><font class="font4" style="text-decoration: none;">HSN/SAC</font></td>
        <td rowspan='2' height='39' class='x97' style='border-left:1px solid #000000;border-bottom:1px solid #000000;height:29.25pt;'><font class="font4" style="text-decoration: none;">QTY</font></td>
        <td colspan='2' rowspan='2' height='39' class='x99' style='border-right:1px solid #000000;border-bottom:1px solid #000000;height:29.25pt;'><font class="font4" style="text-decoration: none;">Unit</font></td>
        <td rowspan='2' height='39' class='x97' style='border-right:1px solid #000000;border-bottom:1px solid #000000;height:29.25pt;'><font class="font4" style="text-decoration: none;">Rate</font></td>
        <td rowspan='2' height='39' class='x103' style='border-left:1px solid #000000;border-bottom:1px solid #000000;height:29.25pt;'><font class="font4" style="text-decoration: none;">Taxable Value</font></td>
        <td colspan='2' class='x105' style='border-right:1px solid #000000;border-bottom:1px solid #000000;'><font class="font4" style="text-decoration: none;">CGST</font></td>
        <td colspan='3' class='x105' style='border-right:1px solid windowtext;border-bottom:1px solid #000000;'><font class="font4" style="text-decoration: none;">SGST</font></td>
        <td rowspan='2' height='39' class='x148' style='border-bottom:1px solid #000000;height:29.25pt;'><font class="font4" style="text-decoration: none;">Total</font></td>
         </tr>
         <tr height='20' style='mso-height-source:userset;height:15pt'>
        <td class='x21'><font class="font4" style="text-decoration: none;">Rate</font></td>
        <td class='x21'><font class="font4" style="text-decoration: none;">Amount</font></td>
        <td class='x21'><font class="font4" style="text-decoration: none;">Rate</font></td>
        <td colspan='2' class='x156' style='border-right:1px solid windowtext;border-bottom:1px solid #000000;'>Amount</td>
         </tr>

         ${rows.map((item, index) => {
           TaxableValuePerItem = item.rate * item.Qty;
           CGSTAmountPerItem = (TaxableValuePerItem * item.Cgst) / 100;
           SGSTAmountPerItem = (TaxableValuePerItem * item.Sgst) / 100;
           TotalAmountWithGstPerItem =
             Math.round(
               (CGSTAmountPerItem +
                 SGSTAmountPerItem +
                 TaxableValuePerItem +
                 Number.EPSILON) *
                 100
             ) / 100;

           return `<tr height='20' style='mso-height-source:userset;height:15pt'>
            <td height='18' class='x22' style='height:13.5pt;'>${item.id}</td>
            <td class='x23'><font class="font5" style="text-decoration: none;">&nbsp;${
              item.Particulars
            }</font></td>
            <td class='x24'>&nbsp;${item.HSNSACCode}</td>
            <td class='x118'>${item.Qty}&nbsp;</td>
            <td colspan='2' class='x93' style='border-right:1px solid #000000;border-bottom:1px solid #000000;'><font class="font5" style="text-decoration: none;">&nbsp;${
              item.Units
            }</font></td>
            <td class='x25' x:num='1.50'>${item.rate}</td>
            <td class='x32' x:num='3000' x:fmla='=D11*G11'>₹ ${TaxableValuePerItem.toFixed(
              2
            )}&nbsp;</td>
            <td class='x26' x:num='0.09'>${item.Cgst}%</td>
            <td class='x33' x:num='270' x:fmla='=H11*I11'>₹ ${CGSTAmountPerItem}&nbsp;</td>
            <td class='x26' x:num='0.09'>${item.Sgst}%</td>
            <td colspan='2' class='x35' x:num='270' x:fmla='=H11*K11' style='border-right:1px solid windowtext;border-bottom:1px solid #000000;'>&nbsp;₹ ${SGSTAmountPerItem}&nbsp;</td>
            <td class='x150' x:num='3540' x:fmla='=SUM(H11,J11,L11)'>₹ ${TotalAmountWithGstPerItem}&nbsp;</td>
             </tr>`;
         })}

         ${dummyrows.map((item, index) => {
           TaxableValuePerItem = item.rate * item.Qty;
           CGSTAmountPerItem = (TaxableValuePerItem * item.Cgst) / 100;
           SGSTAmountPerItem = (TaxableValuePerItem * item.Sgst) / 100;
           TotalAmountWithGstPerItem = CGSTAmountPerItem + SGSTAmountPerItem;

           return `<tr height='20' style='mso-height-source:userset;height:15pt'>
             <td height='18' class='x22' style='height:13.5pt;'></td>
             <td class='x23'><font class="font5" style="text-decoration: none;"></font></td>
             <td class='x24'></td>
             <td class='x118'></td>
             <td colspan='2' class='x93' style='border-right:1px solid #000000;border-bottom:1px solid #000000;'><font class="font5" style="text-decoration: none;"></font></td>
             <td class='x25' x:num='1.50'></td>
             <td class='x32' x:num='3000' x:fmla='=D11*G11'>&nbsp;&nbsp;</td>
             <td class='x26' x:num='0.09'></td>
             <td class='x33' x:num='270' x:fmla='=H11*I11'>&nbsp;&nbsp;</td>
             <td class='x26' x:num='0.09'></td>
             <td colspan='2' class='x35' x:num='270' x:fmla='=H11*K11' style='border-right:1px solid windowtext;border-bottom:1px solid #000000;'>&nbsp;&nbsp;</td>
             <td class='x150' x:num='3540' x:fmla='=SUM(H11,J11,L11)'>&nbsp;&nbsp;</td>
              </tr>`;
         })}
         
         <tr height='20' style='mso-height-source:userset;height:15.45pt'>
        <td colspan='7' height='18' class='x78' style='border-right:1px solid #000000;border-bottom:1px solid #000000;height:13.95pt;'><font class="font4" style="text-decoration: none;">Total </font></td>
        <td class='x27' x:num='11832' x:fmla='=SUM(H11:H27)'>₹${TotalTaxableValue}&nbsp;</td>
        <td colspan='2' class='x81' x:num='855' x:fmla='=SUM(J11:J27)' style='border-right:1px solid #000000;border-bottom:1px solid #000000;'>₹${TotalCGSTAmount}</td>
        <td colspan='3' class='x81' x:num='855' x:fmla='=SUM(L11:L27)' style='border-right:1px solid windowtext;border-bottom:1px solid #000000;'>₹${TotalSGSTAmount}</td>
        <td class='x151' x:num='13542' x:fmla='=SUM(N11:N27)'>₹${TotalAmountWithGst}&nbsp;</td>
         </tr>
         <tr height='20' style='mso-height-source:userset;height:15pt'>
        <td colspan='8' height='19' class='x84' style='border-right:1px solid #000000;height:14.25pt;'></td>
        <td colspan='3' class='x87' style='border-right:1px solid #000000;border-bottom:1px solid #000000;'><font class="font5" style="text-decoration: none;">&nbsp;Total Amount Before Tax<span style='mso-spacerun:yes;'>&nbsp;&nbsp;&nbsp; </span>:</font></td>
        <td colspan='3' class='x90' style='border-right:1px solid #000000;border-bottom:1px solid #000000;'><font class="font5" style="text-decoration: none;">₹</font><font class="font4" style="text-decoration: none;">${TotalTaxableValue}&nbsp;</font></td>
         </tr>
         <tr height='20' style='mso-height-source:userset;height:15pt'>
        <td colspan='8' height='20' class='x160' style='border-right:1px solid #000000;height:15pt;'><font class="font8" style="text-decoration: none;">Total Invoice Amount in words</font></td>
        <td colspan='3' class='x168' style='border-right:1px solid #000000;'>&nbsp;CGST<span style='mso-spacerun:yes;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></td>
        <td colspan='3' class='x66' x:num='855' x:fmla='=I28' style='border-right:1px solid #000000;'>₹${TotalCGSTAmount}&nbsp;</td>
         </tr>
         <tr height='19' style='mso-height-source:userset;height:14.25pt'>
        <td colspan='8' rowspan='4' height='63' class='x69' x:fmla='=RupeeFormat(L34)' style='border-right:1px solid #000000;border-bottom:1px solid #000000;height:47.25pt;'>&nbsp;Rupees ${TotalAmountInWords} Only</td>
        <td colspan='3' class='x169' style='border-right:1px solid #000000;border-bottom:1px solid #000000;'>&nbsp;SGST<span style='mso-spacerun:yes;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></td>
        <td colspan='3' class='x72' x:num='855' x:fmla='=K28' style='border-right:1px solid #000000;border-bottom:1px solid #000000;'>₹${TotalSGSTAmount}&nbsp;</td>
         </tr>
         <tr height='7' style='mso-height-source:userset;height:5.25pt'>
        <td colspan='3' class='x75' style='border-right:1px solid #000000;'><div style='display:block;overflow:hidden'></div></td>
        <td colspan='3' class='x75' style='border-right:1px solid #000000;'><div style='display:block;overflow:hidden'></div></td>
         </tr>
         <tr height='16' style='mso-height-source:userset;height:12pt'>
        <td colspan='3' class='x54' style='border-right:1px solid #000000;'><font class="font5" style="text-decoration: none;">&nbsp;Tax GST Amount <span style='mso-spacerun:yes;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></font></td>
        <td colspan='3' class='x57' x:num='1710' x:fmla='=SUM(L30:N31)' style='border-right:1px solid #000000;'>₹${
          TotalCGSTAmount + TotalSGSTAmount
        }&nbsp;</td>
         </tr>
         <tr height='21' style='mso-height-source:userset;height:15.75pt'>
        <td colspan='3' class='x60' style='border-right:1px solid #000000;border-bottom:1px solid #000000;'><font class="font5" style="text-decoration: none;">&nbsp;Amount With Tax<span style='mso-spacerun:yes;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>:</font></td>
        <td colspan='3' class='x63' x:num='13542' x:fmla='=N28' style='border-right:1px solid #000000;border-bottom:1px solid #000000;'>₹${TotalAmountWithGst}&nbsp;</td>
         </tr>
         <tr height='26' style='mso-height-source:userset;height:19.95pt'>
        <td colspan='8' height='25' class='x36' style='border-right:1px solid #000000;height:19.2pt;'><font class="font4" style="text-decoration: none;">&nbsp;Terms And Conditions</font></td>
        <td colspan='6' class='x39' style='border-right:1px solid #000000;'><font class="font5" style="text-decoration: none;">Certified that the particular given above are true and correct</font></td>
         </tr>
         <tr height='74' style='mso-height-source:userset;height:55.8pt'>
        <td colspan='8' height='74' class='x42' style='border-right:1px solid #000000;height:55.8pt;'><font class="font12" style="text-decoration: none;">&nbsp;&nbsp;&nbsp;1. This is an electronically generated document.<br></font><font class="font12" style="text-decoration: none;">&nbsp;&nbsp;2. All disputes are subject to AURANGABAD jurisdiction</font></td>
        <td colspan='6' class='x45' style='border-right:1px solid #000000;'><font class="font9" style="text-decoration: none;">For, SUDHAI ENTERPRISES</font></td>
         </tr>
         <tr height='67' style='mso-height-source:userset;height:50.55pt'>
        <td colspan='8' height='66' class='x48' style='border-right:1px solid #000000;border-bottom:1px solid #000000;height:49.8pt;'></td>
        <td colspan='6' class='x51' style='border-right:1px solid #000000;border-bottom:1px solid #000000;'><font class="font5" style="text-decoration: none;">Authorised Signatory</font></td>
         </tr>
        <![if supportMisalignedColumns]>
         <tr height='0' style='display:none'>
          <td width='33' style='width:24.75pt;'></td>
          <td width='133' style='width:99.75pt;'></td>
          <td width='66' style='width:49.5pt;'></td>
          <td width='36' style='width:27pt;'></td>
          <td width='34' style='width:25.5pt;'></td>
          <td width='17' style='width:12.75pt;'></td>
          <td width='56' style='width:42pt;'></td>
          <td width='60' style='width:45pt;'></td>
          <td width='41' style='width:30.75pt;'></td>
          <td width='56' style='width:42pt;'></td>
          <td width='52' style='width:39pt;'></td>
          <td width='29' style='width:21.75pt;'></td>
          <td width='38' style='width:28.5pt;'></td>
          <td width='83' style='width:62.25pt;'></td>
         </tr>
         <![endif]>
        </table>
        
        </body>
        
        </html> 
        
        
    `;

  return format;
};
export default htmlFormat;
