import autoTable from 'jspdf-autotable';
import formatDateToDdMmYyyyHHmm from './datetimeFormat';
import jsPDF from 'jspdf';
import { tahoma } from '../assets/fonts/tahoma-base64';

type User = {
  username: string;
  first_name: string;
  link: string;
};

type InputData = {
  event: {
    id: string | number;
    name: string;
    date: string;
  };
  paid: User[];
  unpaid: User[];
};

const generateParticipantsPDF = (data: InputData) => {
  const currentDate = formatDateToDdMmYyyyHHmm(new Date());

  const pdf = new jsPDF('p', 'pt', 'a4');
  let finalY = 30;

  pdf.addFileToVFS('tahoma.ttf', tahoma);
  pdf.addFont('tahoma.ttf', 'tahoma', 'normal');
  pdf.setFont('tahoma');

  const columns = ['TG Username', 'TG Имя', 'Линк'];
  const unpaid_rows = [];
  const paid_rows = [];

  // Unpaid rows
  for (let i = 0; i < data.unpaid.length; i++) {
    let temp = [
      data.unpaid[i].username,
      data.unpaid[i].first_name,
      data.unpaid[i].link,
    ];
    unpaid_rows.push(temp);
  }

  // Paid rows
  for (let i = 0; i < data.paid.length; i++) {
    let temp = [
      data.paid[i].username,
      data.paid[i].first_name,
      data.paid[i].link,
    ];
    paid_rows.push(temp);
  }

  pdf.setFontSize(14);
  pdf.text(`Участники`, 40, finalY);
  finalY += 25;
  pdf.text(`${data.event.name} - ${data.event.date}`, 40, finalY);
  pdf.setFontSize(8);
  finalY += 15;
  pdf.text(`Данные от ${currentDate} (UTC)`, 40, finalY);
  pdf.setFontSize(12);

  if (unpaid_rows.length > 0) {
    pdf.text(`Не оплачено (${unpaid_rows.length})`, 40, finalY + 30);
    autoTable(pdf, {
      startY: finalY + 40,
      head: [columns],
      body: unpaid_rows,
      styles: { font: 'tahoma' },
      headStyles: { fillColor: [204, 89, 94] },
    });
  }

  if (paid_rows.length > 0) {
    finalY = (pdf as any).lastAutoTable.finalY || finalY;
    pdf.text(`Оплачено (${paid_rows.length})`, 40, finalY + 30);
    autoTable(pdf, {
      startY: finalY + 40,
      head: [columns],
      body: paid_rows,
      styles: { font: 'tahoma' },
      headStyles: { fillColor: [142, 204, 171] },
    });
  }

  pdf.save(`Участники-${data.event.name}-${currentDate}.pdf`);
};

export default generateParticipantsPDF;
