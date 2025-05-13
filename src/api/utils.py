from flask import jsonify, url_for
from datetime import datetime, timedelta
import jwt
import smtplib
from email.message import EmailMessage
import os

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" +
                         y + "</a></li>" for y in links])
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"


def send_reset_email(to_email, token):
    msg = MIMEMultipart()
    msg['From'] = os.getenv('MAIL_USERNAME')
    msg['To'] = to_email
    msg['Subject'] = 'Restablecimiento de contraseña'

    reset_url = f"{os.getenv('FRONTEND_URL')}/reset-password/{token}"
    html = f"""
    <html>
    <body>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="{reset_url}">Restablecer contraseña</a>
    </body>
    </html>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP(os.getenv("MAIL_SERVER"), int(os.getenv("MAIL_PORT"))) as server:
        server.starttls()
        server.login(os.getenv("MAIL_USERNAME"), os.getenv("MAIL_PASSWORD"))
        server.send_message(msg)


def send_email(to_email, subject, body, is_html=False):
    msg = EmailMessage()
    msg['From'] = os.getenv('MAIL_USERNAME')
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.set_content(body)

    if is_html:
        msg.set_content("este es un texto plano")
        msg.add_alternative(body, subtype='html')

    else:
        msg.set_content(body)

   # conexion segura usando TLS


try:
    with smtplib.SMTP(os.getenv("MAIL_SERVER"), int(os.getenv("MAIL_PORT"))) as smtp:
        smtp.starttls()
        smtp.login(os.getenv("MAIL_USERNAME"), os.getenv("MAIL_PASSWORD"))
        smtp.send_message(msg)
        print(f"Email sent to {to_email}")
except Exception as e:
    print(f"Failed to send email to  {e}")
