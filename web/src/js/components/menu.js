'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

let Menu = React.createClass({

    componentDidMount() {
        this._resizeWindow();
    },

    render() {
        return (
            <div className="navbar-default sidebar" role="navigation">
                <div id="menu" className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li className="sidebar-search">
                            <div className="input-group custom-search-form">
                                <input type="text" className="form-control" ref="search" id="search" placeholder="Procurar..." autofocus={true} />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={this._filtrarItensMenu}>
                                        <i className="fa fa-search"></i>
                                    </button>
                                </span>
                            </div>
                        </li>

                        <li>
                            <a href="#"><i className="fa fa-edit fa-fw"></i> Cadastros <span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level">
                                <li><Link to="/disciplinas">Disciplina</Link></li>
                                <li><Link to="/cursos">Curso</Link></li>
                                <li><Link to="/turmas">Turma</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    },

    _filtrarItensMenu() {
        let accentFold = function(text) {
            return text.replace(/([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g,
                                function(str,a,c,e,i,n,o,s,u,y,ae) {
                                   if(a) return 'a';
                                   else if(c) return 'c';
                                   else if(e) return 'e';
                                   else if(i) return 'i';
                                   else if(n) return 'n';
                                   else if(o) return 'o';
                                   else if(s) return 's';
                                   else if(u) return 'u';
                                   else if(y) return 'y';
                                   else if(ae) return 'ae';
                                });
        };

        $('#menu ul li a').show();

        let pesquisa = ReactDOM.findDOMNode(this.refs.search).value.trim();

        $.expr[':'].Contains = function(obj, index, meta, stack){
           let val = accentFold((obj.textContent || obj.innerText || $(obj).text() || '').toLowerCase());

           return val.indexOf(accentFold(meta[3].toLowerCase())) >= 0;
        };

        if (pesquisa && pesquisa.replace(' ', '').length > 1) {
            $("#menu ul li a:not(:Contains('"+ pesquisa +"'))").hide();
        }
    },

    _resizeWindow() {
        $(window).bind("load resize", function() {
            let topOffset = 50;
            let width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
            if (width < 768) {
                $('div.navbar-collapse').addClass('collapse');
                topOffset = 100;
            } else {
                $('div.navbar-collapse').removeClass('collapse');
            }

            let height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $("#page-wrapper").css("min-height", (height) + "px");
            }
        });

        let url = window.location;
        let element = $('ul.nav a').filter(function() {
            return this.href == url || url.href.indexOf(this.href) == 0;
        }).addClass('active').parent().parent().addClass('in').parent();

        if (element.is('li')) {
            element.addClass('active');
        }

        $('#side-menu').metisMenu();
    }

});

export default Menu;
