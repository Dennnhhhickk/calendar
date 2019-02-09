$('document').ready(function(){

	var Ffirst = 0;
	var month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	var monthen = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var monthlen = [31,28,31,30,31,30,31,31,30,31,30,31];
	var N = parseInt(12);
	var days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
	var tmp = 0;
	var ii = 0;
	var event = [];
	var eventy = [];
	var eventm = [];
	var eventd = [];
	var Fyear = 1;

	function MAIN()
	{
		var first = Ffirst;
		$('#fgg').remove();
		$('.col1').append('<table id=\"fgg\">\n</table>');

		for (i in month)
		{
			if (parseInt(i) % 4 == 0)
			{
				if (parseInt(i) > 0)
				{
					$('#fgg').append("</tr>");
					ii++;
				}
				if (parseInt(i) < N - 1)
				{
					$('#fgg').append('<tr id=\"hui' + ii + '\">');
				}
			}

			tmp = 0;

			$('#hui' + ii).append("<td id =\"fur" + i + "\">");
			
			$('#fur' + i).append("<div><strong>" + month[i] + "</strong></div>");
			$('#fur' + i).append("<br/>");
			$('#fur' + i).append("<table id=\"" + monthen[i] + "\">");

			for (j in days)
			{
				$('#' + monthen[i]).append("<tr>");
				$('#' + monthen[i]).append("<th>" + days[j] + "</th>");

				var mx = 5;
				var jj = parseInt(j);

				if (4 * 7 + 1 + 6 - first < monthlen[i])
					mx = 6;

				for (var z = 0; z < mx; z++)
				{
					var year;
					if ((z * 7 + jj + 1 - first) <= monthlen[i] && (z * 7 + 1 + jj - first) > 0)
					{
						var stat = "class = \"     \"";
						for (q in eventy)
						{
							year = Fyear;
							if (eventy[q] == year && eventm[q] == i && eventd[q] == (z * 7 + jj + 1 - first))
							{
								stat = "class = \"fufle " + year + ' ' + i + ' ' + (z * 7 + jj + 1 - first) +" \"";
							}
						}
						$('#' + monthen[i]).append("<td " + stat + " >" + (z * 7 + 1 + jj - first) + "</td>\n");
					}
					else 
						if ((z * 7 + 1 + jj - first) > 0)
						{
							var stat = "class = \"     \"";
							for (q in eventy)
							{
								year = Fyear;
								if (i == N - 1)
									year++;
								if (eventy[q] == year && eventm[q] == parseInt(parseInt(i) + 1) % N && eventd[q] == (parseInt(parseInt((z * 7 + 1 + jj - first - 1)) % parseInt(monthlen[i]) + 1)))
								{
									stat = "class = \"fufle " + year + ' ' + parseInt(parseInt(i) + 1) % N + ' ' + (parseInt(parseInt((z * 7 + 1 + jj - first - 1)) % parseInt(monthlen[i]) + 1)) +" \"";
								}
							}
							$('#' + monthen[i]).append("<td " + stat + " >" + (parseInt(parseInt((z * 7 + 1 + jj - first - 1)) % parseInt(monthlen[i]) + 1)) + "</td>\n");	
							tmp = parseInt(tmp + 1);
						}
						else
						{
							var stat = "class = \"     \"";
							for (q in eventy)
							{
								year = Fyear;
								if (i == 0)
									year--;
								if (eventy[q] == year && eventm[q] == parseInt(parseInt(i) - 1 + N) % N && eventd[q] == parseInt(parseInt(monthlen[(i - 1 + N) % N]) + parseInt(z * 7 + 1 + jj - first)))
								{
									stat = "class = \"fufle " + year + ' ' + parseInt(parseInt(i) - 1 + N) % N + ' ' + parseInt(parseInt(monthlen[(i - 1 + N) % N]) + parseInt(z * 7 + 1 + jj - first)) +" \"";
								}
							}
							$('#' + monthen[i]).append("<td " + stat + " >" + parseInt(parseInt(monthlen[(i - 1 + N) % N]) + parseInt(z * 7 + 1 + jj - first)) + "</td>\n");
						}
				}
				
				$('#' + monthen[i]).append("</tr dsfsdf>");
			}

			first = (7 - tmp) % 7;

			$('#fur' + i).append("</table>");
			$('#hui' + ii).append("</td>");
		}
		$('#fgg').append("</tr>");
	};

	$('input').on('change', function()
	{
		Ffirst = 0;
		Fyear = parseInt($('input').val());
		if (Fyear % 400 == 0 || (Fyear % 4 == 0 && Fyear % 100 != 0))
			monthlen[1] = 29;
		else
			monthlen[1] = 28;

		for (var i = 2; i <= Fyear; i++)
		{
			if (i % 400 == 0 || (i % 4 == 0 && i % 100 != 0))
				Ffirst = (Ffirst + 2) % 7;
			else
				Ffirst = (Ffirst + 1) % 7;
		}
		MAIN();
	});

	$('#addEvent').on('click', function()
	{
		var texty = parseInt(prompt('Введите год', '1'));
		var textm = parseInt(prompt('Введите месяц', '1'));
		var textd = parseInt(prompt('Введите день', '1'));
		var text = (prompt('Что будет', ''));
		eventy.push(texty);
		eventm.push(textm - 1);
		eventd.push(textd);
		event.push(text);
		MAIN();
	})

	function processing(str)
	{
		var tmp = [" "];
		var tmpa = "";
		var ans = "";

		for (var i in str)
		{
			if (str[parseInt(i)] == ' ')
			{
				tmp.push(tmpa);
				tmpa = "";
			}
			else
				tmpa += str[parseInt(i)];
		}

		for (var q in eventy)
		{
			if (eventy[q] == parseInt(tmp[2]) && eventm[q] == parseInt(tmp[3]) && eventd[q] == parseInt(tmp[4]))
				ans += event[q] + '\n';
		}
		return ans;
	}

	$(document).on('click', function(e) {
		if (processing($(e.target).attr('class')) != "")
			alert(processing($(e.target).attr('class')));
	});

	$('#View').on('click', function()
	{
		MAIN();
	});

	MAIN();
})